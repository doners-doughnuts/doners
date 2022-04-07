package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.donation.DonationApproveRequestDTO;
import com.doners.donersbackend.application.dto.request.donation.DonationReceivedPatchDTO;
import com.doners.donersbackend.application.dto.request.donation.DonationRegisterPostDTO;
import com.doners.donersbackend.application.dto.request.donation.DonationRecommendPatchDTO;
import com.doners.donersbackend.application.dto.response.donation.DonationCheckResponseDTO;
import com.doners.donersbackend.application.dto.response.donation.DonationGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.donation.DonationRecommendResponseDTO;
import com.doners.donersbackend.application.dto.response.donation.DonationResponseDTO;
import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.enums.CategoryCode;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DonationService {

    // 기부글 신청
    Boolean createDonation(String accessToken, DonationRegisterPostDTO donationRegisterPostDTO, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence);

    // 기부글 목록 조회
    DonationGetListWrapperResponseDTO getDonationList(CategoryCode categoryCode, int page, int sort, boolean view);

    // 승인 대기 중인 기부글 목록 조회
    DonationGetListWrapperResponseDTO getPendingDonationList(String accessToken) throws Exception;

    // 기부글 상세 조회
    DonationResponseDTO getDonation(String donationId);

    // 기부글 추천
    DonationRecommendResponseDTO recommendDonation(String accessToken, DonationRecommendPatchDTO donationRecommendPatchDTO);

    // 기부글 검색
    DonationGetListWrapperResponseDTO searchDonation(CategoryCode category, String type, String keyword, int page, boolean view);

    // 기부글 승인
    Integer approveDonation(String accessToken, DonationApproveRequestDTO donationApproveRequestDTO) throws NullPointerException;

    // 기부글 신청 여부
    DonationCheckResponseDTO checkDonation(String accessToken);

    // 기부글 신청 여부 (승인된 게 있는지)
    DonationCheckResponseDTO checkApprovedDonation(String accessToken);

    // 대표 사진 및 증빙 자료 업로드
    void uploadDonationFile(Donation donation, MultipartFile image, List<MultipartFile> evidence);

    // 관계 증명서 업로드
    void uploadCertificateFile(Donation donation, MultipartFile certificate);

    Integer receiveDonation(String accessToken, DonationReceivedPatchDTO donationReceivedPatchDTO);
}
