package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.donation.DonationApproveRequestDTO;
import com.doners.donersbackend.application.dto.request.donation.DonationInfoRequestDTO;
import com.doners.donersbackend.application.dto.response.donation.*;
import com.doners.donersbackend.domain.dao.image.Image;
import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.donation.DonationBudget;
import com.doners.donersbackend.domain.dao.donation.DonationHistory;
import com.doners.donersbackend.domain.dao.donation.File;
import com.doners.donersbackend.domain.enums.ApprovalStatusCode;
import com.doners.donersbackend.domain.enums.CategoryCode;
import com.doners.donersbackend.domain.repository.*;
import com.doners.donersbackend.domain.repository.donation.DonationBudgetRepository;
import com.doners.donersbackend.domain.repository.donation.DonationHistoryRepository;
import com.doners.donersbackend.domain.repository.donation.DonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {

    private final DonationRepository donationRepository;

    private final DonationBudgetRepository donationBudgetRepository;

    private final DonationHistoryRepository donationHistoryRepository;

    private final UserRepository userRepository;

    private final ImageRepository imageRepository;

    private final FileRepository fileRepository;

    private final AwsS3Service awsS3Service;

    @Transactional
    @Override
    public Boolean createDonation(DonationInfoRequestDTO donationInfoRequestDTO, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence) {

        if (donationRepository.findByUserIdAndIsDeleted(donationInfoRequestDTO.getUserId(), false).orElse(null) != null) return false;

        // 기부글
        Donation donation = Donation.builder()
                .phone(donationInfoRequestDTO.getPhone())
                .isDeputy(donationInfoRequestDTO.isDeputy())
                .beneficiaryName(donationInfoRequestDTO.getBeneficiaryName())
                .beneficiaryPhone(donationInfoRequestDTO.getBeneficiaryPhone())
                .title(donationInfoRequestDTO.getTitle())
                .categoryCode(donationInfoRequestDTO.getCategoryCode())
//                .categoryCode(CategoryCode.COVID_19)
                .approvalStatusCode(ApprovalStatusCode.BEFORE_CONFIRMATION)
                .description(donationInfoRequestDTO.getDescription())
                .amount(donationInfoRequestDTO.getTargetAmount())
//                .endTime(donationInfoRequestDTO.getEndTime())
                .user(userRepository.findById(donationInfoRequestDTO.getUserId())
                        .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다.")))
                .build();

        donationRepository.save(donation);

        // 예산안
        donationInfoRequestDTO.getBudget().forEach(donationBudgetRequestDTO ->
                donationBudgetRepository.save(
                        DonationBudget.builder()
                                .plan(donationBudgetRequestDTO.getPlan())
                                .amount(donationBudgetRequestDTO.getAmount())
                                .donation(donation)
                                .build()
                )
        );

        // 대표 사진 및 증빙 자료 업로드
        uploadDonationFile(donation, image, evidence);

        // 대리인일 경우 관계 증명서 업로드
        if (donationInfoRequestDTO.isDeputy()) uploadCertificateFile(donation, certificate);

        return true;

    }

    @Override
    public DonationGetListWrapperResponseDTO getDonationList(CategoryCode categoryCode) {

        List<Donation> donationList = donationRepository.findByCategoryCodeAndIsDeleted(categoryCode, false)
                .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));

        List<DonationGetListResponseDTO> donationGetListResponseDTOList = new ArrayList<>();

        donationList.forEach(donation -> {
            // 대표 사진
            Map<String, String> image = new HashMap<>();
            Image img = imageRepository.findByDonationAndImageIsResized(donation, true)
                    .orElseThrow(() -> new IllegalArgumentException("해당 기부글에 대한 대표 사진을 찾을 수 없습니다."));
            String imgUrl = awsS3Service.getFilePath(img.getImageNewFileName());
            image.put(img.getImageOriginFileName(), imgUrl);

            donationGetListResponseDTOList.add(
                    DonationGetListResponseDTO.builder()
                            .donationId(donation.getId())
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

    @Transactional
    @Override
    public DonationResponseDTO getDonation(String donationId) {

        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글을 찾을 수 없습니다."));

        // 대표 사진
        Map<String, String> image = new HashMap<>();

        Image img = imageRepository.findByDonationAndImageIsResized(donation, false)
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글에 대한 대표 사진을 찾을 수 없습니다."));

        image.put(img.getImageOriginFileName(), awsS3Service.getFilePath(img.getImageNewFileName()));

        // 예산안
        List<DonationBudget> donationBudgetList = donationBudgetRepository.findByDonation(donation)
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글에 대한 예산안을 찾을 수 없습니다."));
        List<DonationBudgetResponseDTO> donationBudgetResponseDTOList = new ArrayList<>();

        donationBudgetList.forEach(donationBudget ->
                donationBudgetResponseDTOList.add(
                        DonationBudgetResponseDTO.builder()
                                .plan(donationBudget.getPlan())
                                .amount(donationBudget.getAmount())
                                .build()
                )
        );

        // 모금 내역
        List<DonationHistory> donationHistoryList = donationHistoryRepository.findByDonation(donation)
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글에 대한 모금 내역을 찾을 수 없습니다."));
        List<DonationHistoryResponseDTO> donationHistoryResponseDTOList = new ArrayList<>();

        // 현재까지의 모금액
        long amountSum = 0;

        for (DonationHistory donationHistory : donationHistoryList) {
            amountSum += donationHistory.getAmount();

            donationHistoryResponseDTOList.add(
                    DonationHistoryResponseDTO.builder()
                            .nickname(donationHistory.getUser().getUserNickname())
                            .amount(donationHistory.getAmount())
                            .build()
            );
        }

        // 증빙 자료
        List<File> fileList = fileRepository.findByDonation(donation)
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글에 대한 증빙 자료를 찾을 수 없습니다."));

        Map<String, String> evidence = new HashMap<>();

        fileList.forEach(file ->
                evidence.put(file.getOriginalFileName(), awsS3Service.getFilePath(file.getSavedFileName()))
        );

        // 조회수 증가
        increaseViews(donation);

        return DonationResponseDTO.builder()
                .title(donation.getTitle())
                .categoryCode(donation.getCategoryCode())
                .views(donation.getViews())
                .description(donation.getDescription())
                .image(image)
                .startTime(donation.getStartTime())
                .endTime(donation.getEndTime())
                .targetAmount(donation.getAmount())
                .budget(donationBudgetResponseDTOList)
                .name(donation.getUser().getUserName())
                .email(donation.getUser().getUserEmail())
                .phone(donation.getPhone())
                .exist(donationRepository.existsByIdAndIsDeleted(donationId, true))
                .approvalStatusCode(donation.getApprovalStatusCode())
                .donors(donationHistoryResponseDTOList)
                .achievementRate((double) amountSum / donation.getAmount() * 100)
                .evidence(evidence)
                .build();

    }

    @Override
    public DonationRecommendResponseDTO recommendDonation(String donationId) {

        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글을 찾을 수 없습니다."));

        // 추천수 업데이트
        donation.changeRecommendations();

        donationRepository.save(donation);

        return DonationRecommendResponseDTO.builder()
                .recommendations(donation.getRecommendations())
                .build();

    }

    @Override
    public DonationGetListWrapperResponseDTO searchDonation(String type, String keyword) {

        List<Donation> donationList = new ArrayList<>();

        switch (type) {
            // 제목 + 사연
            case "td":
                donationList = donationRepository.findByTitleContainingOrDescriptionContaining(keyword, keyword)
                        .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                break;
            // 제목
            case "t":
                donationList = donationRepository.findByTitleContaining(keyword)
                        .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                break;
            // 사연
            case "d":
                donationList = donationRepository.findByDescriptionContaining(keyword)
                        .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                break;
            // 닉네임
            case "n":
                donationList = donationRepository.findByUser(userRepository.findByUserNickname(keyword).orElse(null))
                        .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                break;
        }

        List<DonationGetListResponseDTO> donationGetListResponseDTOList = new ArrayList<>();

        donationList.forEach(donation -> {
            // 대표 사진
            Map<String, String> image = new HashMap<>();
            Image img = imageRepository.findByDonationAndImageIsResized(donation, true)
                    .orElseThrow(() -> new IllegalArgumentException("해당 기부글에 대한 대표 사진을 찾을 수 없습니다."));
            String imgUrl = awsS3Service.getFilePath(img.getImageNewFileName());
            image.put(img.getImageOriginFileName(), imgUrl);

            donationGetListResponseDTOList.add(
                    DonationGetListResponseDTO.builder()
                            .donationId(donation.getId())
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

    @Override
    public Integer approveDonation(DonationApproveRequestDTO donationApproveRequestDTO) throws NullPointerException {

        // TODO: 관리자인지 확인'

        Donation donation = donationRepository.findById(donationApproveRequestDTO.getDonationId())
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글을 찾을 수 없습니다."));

        // 이미 승인
        if (donation.isApproved()) return 2;

        // 거절
        if (!donationApproveRequestDTO.isApproved()) {
            if (donationApproveRequestDTO.getApprovalStatusCode() == null) throw new NullPointerException();

            donation.changeApprovalStatusCode(donationApproveRequestDTO.getApprovalStatusCode());

            donationRepository.save(donation);

            return 0;
        }

        // 신청 승인 및 시작 시간 설정
        donation.changeIsApproved();
        donation.changeApprovalStatusCode(ApprovalStatusCode.APPROVAL);
        donation.changeStartTime();

        donationRepository.save(donation);

        return 1;

    }

    @Override
    public void uploadDonationFile(Donation donation, MultipartFile image, List<MultipartFile> evidence) {

        if (image != null) {
            String fileName = awsS3Service.uploadImage(image);

            Image img = Image.builder()
                    .imageOriginFileName(image.getOriginalFilename())
                    .imageNewFileName(fileName)
                    .donation(donation)
                    .build();

            imageRepository.save(img);

            String thumbNailFileName = awsS3Service.uploadThumbnailImage(fileName, image);

            Image thumbNailImg = Image.builder()
                    .imageOriginFileName(image.getOriginalFilename())
                    .imageNewFileName(thumbNailFileName)
                    .imageIsResized(true)
                    .donation(donation)
                    .build();

            imageRepository.save(thumbNailImg);
        }

        evidence.forEach(file -> {
            String fileName = awsS3Service.uploadFile(file);

            File evidenceFile = File.builder()
                    .originalFileName(file.getOriginalFilename())
                    .savedFileName(fileName)
                    .donation(donation)
                    .build();

            fileRepository.save(evidenceFile);
        });

    }

    @Override
    public void uploadCertificateFile(Donation donation, MultipartFile certificate) {

        String fileName = awsS3Service.uploadFile(certificate);

        File certificateFile = File.builder()
                .originalFileName(certificate.getOriginalFilename())
                .savedFileName(fileName)
                .donation(donation)
                .build();

        fileRepository.save(certificateFile);

    }

    public void increaseViews(Donation donation) {

        // 조회수 업데이트
        donation.changeViews();

        donationRepository.save(donation);

    }

}
