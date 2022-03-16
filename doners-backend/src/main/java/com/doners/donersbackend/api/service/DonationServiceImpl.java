package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.DonationInfoDTO;
import com.doners.donersbackend.db.entity.donation.Donation;
import com.doners.donersbackend.db.repository.DonationRepository;
import com.doners.donersbackend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {

    private final DonationRepository donationRepository;

    private final UserRepository userRepository;

    private final AwsS3Service awsS3Service;

    @Transactional
    @Override
    public boolean createDonation(DonationInfoDTO donationInfoDTO, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence) {

        if (donationRepository.findByUserId(donationInfoDTO.getUserId()).orElse(null) != null) return false;

        Donation donation = Donation.builder()
                .phone(donationInfoDTO.getPhone())
                .isDeputy(donationInfoDTO.isDeputy())
                .beneficiaryName(donationInfoDTO.getBeneficiaryName())
                .beneficiaryPhone(donationInfoDTO.getBeneficiaryPhone())
                .title(donationInfoDTO.getTitle())
                .description(donationInfoDTO.getDescription())
                .amount(donationInfoDTO.getTargetAmount())
                .startTime(LocalDateTime.now())
                .endTime(LocalDateTime.now())
//                .endTime(donationInfoDTO.getEndTime())
                .user(userRepository.findById(donationInfoDTO.getUserId()).get())
                .build();

        donationRepository.save(donation);

        // 본인
        if (!donationInfoDTO.isDeputy()) awsS3Service.uploadMyFile(donation, image, evidence);
            // 대리인
        else awsS3Service.uploadDeputyFile(donation, certificate, image, evidence);

        return true;

    }
}
