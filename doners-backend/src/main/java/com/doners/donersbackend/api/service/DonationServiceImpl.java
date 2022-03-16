package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.DonationInfoRequestDTO;
import com.doners.donersbackend.api.dto.response.DonationGetListResponseDTO;
import com.doners.donersbackend.api.dto.response.DonationGetListWrapperResponseDTO;
import com.doners.donersbackend.db.entity.Image;
import com.doners.donersbackend.db.entity.donation.Donation;
import com.doners.donersbackend.db.entity.donation.DonationBudget;
import com.doners.donersbackend.db.repository.DonationBudgetRepository;
import com.doners.donersbackend.db.repository.DonationRepository;
import com.doners.donersbackend.db.repository.ImageRepository;
import com.doners.donersbackend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {

    private final DonationRepository donationRepository;

    private final DonationBudgetRepository donationBudgetRepository;

    private final UserRepository userRepository;

    private final ImageRepository imageRepository;

    private final AwsS3Service awsS3Service;

    @Transactional
    @Override
    public boolean createDonation(DonationInfoRequestDTO donationInfoRequestDTO, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence) {

        if (donationRepository.findByUserId(donationInfoRequestDTO.getUserId()).orElse(null) != null) return false;

        Donation donation = Donation.builder()
                .phone(donationInfoRequestDTO.getPhone())
                .isDeputy(donationInfoRequestDTO.isDeputy())
                .beneficiaryName(donationInfoRequestDTO.getBeneficiaryName())
                .beneficiaryPhone(donationInfoRequestDTO.getBeneficiaryPhone())
                .title(donationInfoRequestDTO.getTitle())
                .category(donationInfoRequestDTO.getCategory())
                .description(donationInfoRequestDTO.getDescription())
                .amount(donationInfoRequestDTO.getTargetAmount())
                .startTime(LocalDateTime.now())
                .endTime(LocalDateTime.now())
//                .endTime(donationInfoRequestDTO.getEndTime())
                .user(userRepository.findById(donationInfoRequestDTO.getUserId()).get())
                .build();

        donationRepository.save(donation);

        donationInfoRequestDTO.getBudget().forEach(donationBudgetRequestDTO ->
                donationBudgetRepository.save(
                        DonationBudget.builder()
                                .plan(donationBudgetRequestDTO.getPlan())
                                .amount(donationBudgetRequestDTO.getAmount())
                                .donation(donation)
                                .build()
                )
        );

        // 본인
        if (!donationInfoRequestDTO.isDeputy()) awsS3Service.uploadMyFile(donation, image, evidence);
            // 대리인
        else awsS3Service.uploadDeputyFile(donation, certificate, image, evidence);

        return true;

    }

    @Override
    public DonationGetListWrapperResponseDTO getList(String category) {

        List<Donation> donationList = donationRepository.findByCategoryAndIsDeleted(category, false).orElse(null);

        List<DonationGetListResponseDTO> donationGetListResponseDTOList = new ArrayList<>();

        donationList.forEach(donation -> {
            Map<String, String> image = new HashMap<>();

            Image img = imageRepository.findByDonation(donation).get();

            String imgUrl = awsS3Service.getFilePath(img.getImageNewFileName());

            image.put(img.getImageOriginFileName(), imgUrl);

            donationGetListResponseDTOList.add(
                    DonationGetListResponseDTO.builder()
                            .image(image)
                            .title(donation.getTitle())
                            .beneficiaryName(donation.getBeneficiaryName())
                            .targetAmount(donation.getAmount())
                            .build()
            );
        });

        return DonationGetListWrapperResponseDTO.builder()
                .donationGetListResponseDTOList(donationGetListResponseDTOList)
                .build();

    }

}
