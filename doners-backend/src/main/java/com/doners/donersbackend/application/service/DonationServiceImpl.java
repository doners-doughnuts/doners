package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.donation.DonationApproveRequestDTO;
import com.doners.donersbackend.application.dto.request.donation.DonationRecommendPatchDTO;
import com.doners.donersbackend.application.dto.request.donation.DonationRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.donation.*;
import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.donation.DonationBudget;
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
import com.doners.donersbackend.domain.repository.donation.DonationRepository;
import com.doners.donersbackend.security.util.JwtAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {

    private final DonationRepository donationRepository;

    private final DonationBudgetRepository donationBudgetRepository;

    private final UserRepository userRepository;

    private final ImageRepository imageRepository;

    private final FileRepository fileRepository;

    private final AwsS3Service awsS3Service;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    @Transactional
    @Override
    public Boolean createDonation(String accessToken, DonationRegisterPostDTO donationRegisterPostDTO, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence) {

        User user = convertAccessTokenToUser(accessToken);

        Donation donation = Donation.builder()
                .phone(donationRegisterPostDTO.getPhone())
                .isDeputy(donationRegisterPostDTO.isDeputy())
                .title(donationRegisterPostDTO.getTitle())
                .categoryCode(donationRegisterPostDTO.getCategoryCode())
                .approvalStatusCode(ApprovalStatusCode.BEFORE_CONFIRMATION)
                .description(donationRegisterPostDTO.getDescription())
                .account(user.getUserAccount())
                .amount(donationRegisterPostDTO.getTargetAmount())
                .endDate(donationRegisterPostDTO.getEndDate())
                .user(user)
                .build();

        // 대리인
        if (donationRegisterPostDTO.isDeputy()) {
            donation.changeBeneficiary(donationRegisterPostDTO.getBeneficiaryName(), donationRegisterPostDTO.getBeneficiaryPhone());
        // 본인
        } else {
            donation.changeBeneficiary(user.getUserName(), donationRegisterPostDTO.getPhone());
        }

        donationRepository.save(donation);

        // 예산안
        donationRegisterPostDTO.getBudget().forEach(donationBudgetRequestDTO ->
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
        if (donationRegisterPostDTO.isDeputy()) uploadCertificateFile(donation, certificate);

        return true;

    }

    @Override
    public DonationGetListWrapperResponseDTO getDonationList(CategoryCode categoryCode, int page, int sort, boolean view) {

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
                // 마감 임박 순
                case 2:
                    donationList = donationRepository
                            .findByCategoryCodeAndIsApprovedAndIsDeleted(categoryCode, true, false, PageRequest.of(page - 1, 9, Sort.Direction.ASC, "endDate"))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
            }
        // 모금 가능한 기부만 보기
        } else {
            LocalDate now = LocalDate.now();

            switch (sort) {
                // 최신 순
                case 1:
                    donationList = donationRepository
                            .findByCategoryCodeAndIsApprovedAndIsDeletedAndEndDateGreaterThanEqual(categoryCode, true, false, now, PageRequest.of(page - 1, 9, Sort.Direction.DESC, "startDate"))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
                // 마감 임박 순
                case 2:
                    donationList = donationRepository
                            .findByCategoryCodeAndIsApprovedAndIsDeletedAndEndDateGreaterThanEqual(categoryCode, true, false, now, PageRequest.of(page - 1, 9, Sort.Direction.ASC, "endDate"))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
            }
        }

        return convertDonationListToDTO(donationList);

    }

    @Override
    public DonationGetListWrapperResponseDTO getPendingDonationList(String accessToken) throws Exception {

        User user = convertAccessTokenToUser(accessToken);

        if (!user.getUserCode().equals(UserCode.ADMIN)) throw new Exception("관리자가 아닙니다.");

        List<Donation> pendingDonationList = donationRepository.findByIsApprovedAndApprovalStatusCode(false, ApprovalStatusCode.BEFORE_CONFIRMATION)
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

        // 조회수 증가
        increaseViews(donation);

        DonationResponseDTO donationResponseDTO = DonationResponseDTO.builder()
                .contractAddress(donation.getContractAddress())
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
    public DonationGetListWrapperResponseDTO searchDonation(CategoryCode category, String type, String keyword, int page, boolean view) {

        List<Donation> donationList = new ArrayList<>();

        // 전체 보기
        if (!view) {
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
        // 모금 가능한 기부만 보기
        } else {
            LocalDate now = LocalDate.now();

            switch (type) {
                // 제목 + 사연
                case "td":
                    donationList = donationRepository.findByCategoryCodeAndTitleContainingOrDescriptionContainingAndEndDateGreaterThanEqual(category, keyword, keyword, now, PageRequest.of(page - 1, 9))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
                // 제목
                case "t":
                    donationList = donationRepository.findByCategoryCodeAndTitleContainingAndEndDateGreaterThanEqual(category, keyword, now, PageRequest.of(page - 1, 9))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
                // 사연
                case "d":
                    donationList = donationRepository.findByCategoryCodeAndDescriptionContainingAndEndDateGreaterThanEqual(category, keyword, now, PageRequest.of(page - 1, 9))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
                // 닉네임
                case "n":
                    donationList = donationRepository.findByCategoryCodeAndUserAndEndDateGreaterThanEqual(category, userRepository.findByUserNicknameAndUserIsDeleted(keyword, false).orElse(null), now, PageRequest.of(page - 1, 9))
                            .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));
                    break;
            }
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
            donation.changeIsDeleted();

            donationRepository.save(donation);

            return 2;
        }

        // 승인 처리
        donation.changeIsApproved();
        donation.changeApprovalStatusCode(ApprovalStatusCode.APPROVAL);
        donation.changeContractAddress(donationApproveRequestDTO.getContractAddress());
        donation.changeStartDate();

        donationRepository.save(donation);

        return 3;

    }

    @Override
    public DonationCheckResponseDTO checkDonation(String accessToken) {

        User user = convertAccessTokenToUser(accessToken);

        return DonationCheckResponseDTO.builder()
                .apply(donationRepository.findByUserAndIsApprovedAndEndDateGreaterThanEqual(user, true, LocalDate.now()).orElse(null) != null)
                .build();

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
                                .contractAddress(donation.getContractAddress())
                                .targetAmount(donation.getAmount())
                                .endDate(donation.getEndDate())
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

        donation.changeViews();

        donationRepository.save(donation);

    }

    private void increaseRecommendations(Donation donation) {

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
