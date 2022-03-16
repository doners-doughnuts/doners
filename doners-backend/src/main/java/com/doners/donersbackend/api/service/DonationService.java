package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.DonationInfoDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DonationService {

    // 기부 신청
    boolean createDonation(DonationInfoDTO donationInfoDTO, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence);

}
