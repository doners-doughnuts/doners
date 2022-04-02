package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.donation.DonationApproveRequestDTO;
import com.doners.donersbackend.application.dto.request.donation.DonationInfoRequestDTO;
import com.doners.donersbackend.application.dto.request.donation.DonationRecommendPatchDTO;
import com.doners.donersbackend.application.dto.response.donation.*;
import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.donation.DonationBudget;
import com.doners.donersbackend.domain.dao.donation.DonationHistory;
import com.doners.donersbackend.domain.dao.donation.File;
import com.doners.donersbackend.domain.dao.image.Image;
import com.doners.donersbackend.domain.dao.user.User;
import com.doners.donersbackend.domain.enums.ApprovalStatusCode;
import com.doners.donersbackend.domain.enums.CategoryCode;
import com.doners.donersbackend.domain.enums.UserCode;
import com.doners.donersbackend.domain.repository.FileRepository;
import com.doners.donersbackend.domain.repository.ImageRepository;
import com.doners.donersbackend.domain.repository.UserRepository;
import com.doners.donersbackend.domain.repository.donation.DonationBudgetRepository;
import com.doners.donersbackend.domain.repository.donation.DonationHistoryRepository;
import com.doners.donersbackend.domain.repository.donation.DonationRepository;
import com.doners.donersbackend.security.util.JwtAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    @Transactional
    @Override
    public Boolean createDonation(String accessToken, DonationInfoRequestDTO donationInfoRequestDTO, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence) {

        User user = convertAccessTokenToUser(accessToken);

        if (donationRepository.findByUserAndIsDeleted(user, false).orElse(null) != null) return false;

        Donation donation = Donation.builder()
                .phone(donationInfoRequestDTO.getPhone())
                .isDeputy(donationInfoRequestDTO.isDeputy())
                .title(donationInfoRequestDTO.getTitle())
                .categoryCode(donationInfoRequestDTO.getCategoryCode())
                .approvalStatusCode(ApprovalStatusCode.BEFORE_CONFIRMATION)
                .description(donationInfoRequestDTO.getDescription())
                .account(donationInfoRequestDTO.getAccount())
                .amount(donationInfoRequestDTO.getTargetAmount())
                .endDate(donationInfoRequestDTO.getEndDate())
                .user(user)
                .build();

        // 대리인
        if (donationInfoRequestDTO.isDeputy()) {
            donation.changeBeneficiary(donationInfoRequestDTO.getBeneficiaryName(), donationInfoRequestDTO.getBeneficiaryPhone());
            // 본인
        } else {
            donation.changeBeneficiary(user.getUserName(), donationInfoRequestDTO.getPhone());
        }

        donationRepository.save(donation);

        // 예산안
        donationInfoRequestDTO.getBudget().forEach(donationBudgetRequestDTO ->
                donationBudgetRepository.save(
                        DonationBudget.builder()
                                .plan(donationBudgetRequestDTO.getPlan())
                                .amount(donationBudgetRequestDTO.getAmount())
                                .sequence(donationBudgetRequestDTO.getSequence())
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
    public DonationGetListWrapperResponseDTO getDonationList(CategoryCode categoryCode, int page, int sort, boolean view) {
        System.out.println("@@@@@@@@" + categoryCode);
        System.out.println("@@@@@@@@" + page);
        System.out.println("@@@@@@@@" + sort);
        System.out.println("@@@@@@@@" + view);

        List<Donation> donationList = new ArrayList<>();

        // 전체 보기
        if (!view) {
            switch (sort) {
                // 최신 순
                case 1:
                    donationList = donationRepository
                            .findByCategoryCodeAndIsApprovedAndIsDeleted(categoryCode, true, false, PageRequest.of(page - 1, 9, Sort.Direction.DESC, "startDate"))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
                // 참여 미달 순
                // TODO: 보류 (달성률을 어떻게 할 것인지)
                case 2:
                    donationList = donationRepository
                            .findByCategoryCodeAndIsApprovedAndIsDeleted(categoryCode, true, false, PageRequest.of(page - 1, 9))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
                // 마감 임박 순
                case 3:
                    donationList = donationRepository
                            .findByCategoryCodeAndIsApprovedAndIsDeleted(categoryCode, true, false, PageRequest.of(page - 1, 9, Sort.Direction.ASC, "endDate"))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
            }
            // TODO: 모금 가능한 기부만 보기
        } else {
            switch (sort) {
                // 최신 순
                case 1:
                    donationList = donationRepository
                            .findByCategoryCodeAndIsApprovedAndIsDeleted(categoryCode, true, false, PageRequest.of(page - 1, 9, Sort.Direction.DESC, "startDate"))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
                // 참여 미달 순
                // TODO: 보류 (달성률을 어떻게 할 것인지)
                case 2:
                    donationList = donationRepository
                            .findByCategoryCodeAndIsApprovedAndIsDeleted(categoryCode, true, false, PageRequest.of(page - 1, 9))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
                // 마감 임박 순
                case 3:
                    donationList = donationRepository
                            .findByCategoryCodeAndIsApprovedAndIsDeleted(categoryCode, true, false, PageRequest.of(page - 1, 9, Sort.Direction.ASC, "endDate"))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
            }
        }

        System.out.println("donationList size : " + donationList.size());
        return convertDonationListToDTO(donationList);

    }

    @Override
    public DonationGetListWrapperResponseDTO getPendingDonationList(String accessToken) {

        User user = convertAccessTokenToUser(accessToken);

        List<Donation> pendingDonationList = donationRepository.findByIsApproved(false)
                .orElseThrow(() -> new IllegalArgumentException("미승인 기부 요청이 없습니다."));

        return convertDonationListToDTO(pendingDonationList);

    }

    @Transactional
    @Override
    public DonationResponseDTO getDonation(String donationId) {

        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글을 찾을 수 없습니다."));

        // 예산안
        List<DonationBudget> donationBudgetList = donationBudgetRepository.findByDonation(donation)
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글에 대한 예산안을 찾을 수 없습니다."));
        List<DonationBudgetResponseDTO> donationBudgetResponseDTOList = new ArrayList<>();

        donationBudgetList.forEach(donationBudget ->
                donationBudgetResponseDTOList.add(
                        DonationBudgetResponseDTO.builder()
                                .plan(donationBudget.getPlan())
                                .amount(donationBudget.getAmount())
                                .sequence(donationBudget.getSequence())
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

        List<FileResponseDTO> evidence = new ArrayList<>();

        fileList.forEach(file ->
                evidence.add(FileResponseDTO.builder()
                        .name(file.getOriginalFileName())
                        .url(awsS3Service.getFilePath(file.getSavedFileName()))
                        .build()
                )
        );

        // 조회수 업데이트
        increaseViews(donation);

        DonationResponseDTO donationResponseDTO = DonationResponseDTO.builder()
                .title(donation.getTitle())
                .categoryCode(donation.getCategoryCode())
                .views(donation.getViews())
                .recommendations(donation.getRecommendations())
                .description(donation.getDescription())
                .image(getDonationImage(donation, false))
                .startDate(donation.getStartDate())
                .endDate(donation.getEndDate())
                .account(donation.getAccount())
                .targetAmount(donation.getAmount())
                .budget(donationBudgetResponseDTOList)
                .name(donation.getUser().getUserName())
                .nickname(donation.getUser().getUserNickname())
                .email(donation.getUser().getUserEmail())
                .phone(donation.getPhone())
                .deputy(donation.isDeputy())
                .exist(donationRepository.existsByIdAndIsDeleted(donationId, true))
                .approvalStatusCode(donation.getApprovalStatusCode())
                .donors(donationHistoryResponseDTOList)
                .achievementRate((double) amountSum / donation.getAmount() * 100)
                .evidence(evidence)
                .build();

        // 대리인
        if (donation.isDeputy()) donationResponseDTO.changeBeneficiaryName(donation.getBeneficiaryName());

        return donationResponseDTO;

    }

    @Override
    public DonationRecommendResponseDTO recommendDonation(String accessToken, DonationRecommendPatchDTO donationRecommendPatchDTO) {

        convertAccessTokenToUser(accessToken);

        Donation donation = donationRepository.findById(donationRecommendPatchDTO.getDonationId())
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글을 찾을 수 없습니다."));

        // 추천수 증가
        increaseRecommendations(donation);

        return DonationRecommendResponseDTO.builder()
                .recommendations(donation.getRecommendations())
                .build();

    }

    @Override
    public DonationGetListWrapperResponseDTO searchDonation(CategoryCode category, String type, String keyword, int page) {

        List<Donation> donationList = new ArrayList<>();

        switch (type) {
            // 제목 + 사연
            case "td":
                donationList = donationRepository.findByCategoryCodeAndTitleContainingOrDescriptionContaining(category, keyword, keyword, PageRequest.of(page - 1, 9))
                        .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                break;
            // 제목
            case "t":
                donationList = donationRepository.findByCategoryCodeAndTitleContaining(category, keyword, PageRequest.of(page - 1, 9))
                        .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                break;
            // 사연
            case "d":
                donationList = donationRepository.findByCategoryCodeAndDescriptionContaining(category, keyword, PageRequest.of(page - 1, 9))
                        .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                break;
            // 닉네임
            case "n":
                donationList = donationRepository.findByCategoryCodeAndUser(category, userRepository.findByUserNicknameAndUserIsDeleted(keyword, false).orElse(null), PageRequest.of(page - 1, 9))
                        .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                break;
        }

        return convertDonationListToDTO(donationList);

    }

    @Override
    public Integer approveDonation(String accessToken, DonationApproveRequestDTO donationApproveRequestDTO) throws NullPointerException {

        User user = convertAccessTokenToUser(accessToken);

        if (user.getUserCode() != UserCode.ADMIN) return 0;

        Donation donation = donationRepository.findById(donationApproveRequestDTO.getDonationId())
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글을 찾을 수 없습니다."));

        // 이미 승인
        if (donation.isApproved()) return 1;

        // 거절
        if (!donationApproveRequestDTO.isApproved()) {
            if (donationApproveRequestDTO.getRejectionCode() == null) throw new NullPointerException();

            donation.changeApprovalStatusCode(donationApproveRequestDTO.getRejectionCode());

            donationRepository.save(donation);

            return 2;
        }

        // 신청 승인 및 시작 시간 설정
        donation.changeIsApproved();
        donation.changeApprovalStatusCode(ApprovalStatusCode.APPROVAL);
        donation.changeStartDate();

        donationRepository.save(donation);

        return 3;

    }

    @Override
    public void uploadDonationFile(Donation donation, MultipartFile image, List<MultipartFile> evidence) {

        if (image != null) {
            String fileName = awsS3Service.uploadImage(image);

            imageRepository.save(Image.builder()
                    .imageOriginFileName(image.getOriginalFilename())
                    .imageNewFileName(fileName)
                    .donation(donation)
                    .build());

            String thumbNailFileName = awsS3Service.uploadThumbnailImage(fileName, image);

            Image thumbNail = Image.builder()
                    .imageOriginFileName(image.getOriginalFilename())
                    .imageNewFileName(thumbNailFileName)
                    .imageIsResized(true)
                    .donation(donation)
                    .build();

            imageRepository.save(thumbNail);
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

    private DonationGetListWrapperResponseDTO convertDonationListToDTO(List<Donation> donationList) {

        List<DonationGetListResponseDTO> donationGetListResponseDTOList = new ArrayList<>();

        donationList.forEach(donation ->
                donationGetListResponseDTOList.add(
                        DonationGetListResponseDTO.builder()
                                .donationId(donation.getId())
                                .thumbnail(getDonationImage(donation, true))
                                .title(donation.getTitle())
                                .beneficiaryName(donation.getBeneficiaryName())
                                .targetAmount(donation.getAmount())
                                .build()
                )
        );

        return DonationGetListWrapperResponseDTO.builder()
                .donationGetListResponseDTOList(donationGetListResponseDTOList)
                .build();

    }

    private String getDonationImage(Donation donation, boolean resized) {

        Image image = imageRepository.findByDonationAndImageIsResized(donation, resized).orElse(null);

        return image == null ? "" : "https://donersa404.s3.ap-northeast-2.amazonaws.com/" + image.getImageNewFileName();

    }

    private void increaseViews(Donation donation) {

        // 조회수 증가
        donation.changeViews();

        donationRepository.save(donation);

    }

    private void increaseRecommendations(Donation donation) {

        // 추천수 업데이트
        donation.changeRecommendations();

        donationRepository.save(donation);

    }

    private User convertAccessTokenToUser(String accessToken) {

        String token = accessToken.split(" ")[1];

        String userAccount = jwtAuthenticationProvider.getUserAccount(token);

        return userRepository.findByUserAccountAndUserIsDeleted(userAccount, false)
                .orElseThrow(() -> new IllegalArgumentException("해당 계정을 찾을 수 없습니다."));

    }

}
