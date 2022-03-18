package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.DonationInfoRequestDTO;
import com.doners.donersbackend.api.dto.response.DonationGetListWrapperResponseDTO;
import com.doners.donersbackend.api.dto.response.DonationResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DonationService {

    // 기부 신청
    boolean createDonation(DonationInfoRequestDTO donationInfoRequestDTO, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence);

    // 기부글 목록 조회
    DonationGetListWrapperResponseDTO getDonationList(String category);

    // 기부글 상세 조회
    DonationResponseDTO getDonation(String donationId);

}
