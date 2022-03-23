package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.donation.DonationApproveRequestDTO;
import com.doners.donersbackend.api.dto.request.donation.DonationInfoRequestDTO;
import com.doners.donersbackend.api.dto.response.donation.DonationGetListWrapperResponseDTO;
import com.doners.donersbackend.api.dto.response.donation.DonationRecommendResponseDTO;
import com.doners.donersbackend.api.dto.response.donation.DonationResponseDTO;
import com.doners.donersbackend.db.entity.donation.Donation;
import com.doners.donersbackend.db.enums.CategoryCode;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DonationService {

    // 기부글 신청
    Boolean createDonation(DonationInfoRequestDTO donationInfoRequestDTO, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence);

    // 기부글 목록 조회
    DonationGetListWrapperResponseDTO getDonationList(CategoryCode categoryCode);

    // 기부글 상세 조회
    DonationResponseDTO getDonation(String donationId);

    // 기부글 추천
    DonationRecommendResponseDTO recommendDonation(String donationId);

    // 기부글 검색
    DonationGetListWrapperResponseDTO searchDonation(String type, String keyword);

    // 기부글 승인
    Integer approveDonation(DonationApproveRequestDTO donationApproveRequestDTO) throws NullPointerException;

    // 대표 사진 및 증빙 자료 업로드
    void uploadDonationFile(Donation donation, MultipartFile image, List<MultipartFile> evidence);

    // 관계 증명서 업로드
    void uploadCertificateFile(Donation donation, MultipartFile certificate);

}
