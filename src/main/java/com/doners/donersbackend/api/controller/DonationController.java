package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.api.dto.request.DonationInfoDTO;
import com.doners.donersbackend.api.service.DonationService;
import com.doners.donersbackend.common.model.BaseResponseDTO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Api(value = "Donation API", tags = {"Donation"})
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/donation")
public class DonationController {

    private final DonationService donationService;

    @ApiOperation(value = "모금 신청 정보 입력")
    @ApiResponses({
            @ApiResponse(code = 201, message = "기부 신청에 성공했습니다."),
            @ApiResponse(code = 409, message = "기부 신청에 실패했습니다.")
    })
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<? extends BaseResponseDTO> register(
            @ApiParam(value = "기부 신청 정보", required = true) @RequestPart DonationInfoDTO donationInfoDTO,
            @ApiParam(value = "관계증명서", required = false) @RequestPart(value = "certificate", required = false) MultipartFile certificate,
            @ApiParam(value = "대표 사진", required = false) @RequestPart(value = "image", required = false) MultipartFile image,
            @ApiParam(value = "증빙 자료", required = true) @RequestPart(value = "evidence") List<MultipartFile> evidence
    ) {

        if (donationService.createDonation(donationInfoDTO, certificate, image, evidence)) {
            return ResponseEntity.status(201).body(BaseResponseDTO.of("신청 완료", 201));
        } else {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("신청 불가", 409));
        }

    }

}
