package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.api.dto.request.DonationInfoRequestDTO;
import com.doners.donersbackend.api.dto.response.DonationGetListWrapperResponseDTO;
import com.doners.donersbackend.api.dto.response.DonationRecommendResponseDTO;
import com.doners.donersbackend.api.dto.response.DonationResponseDTO;
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

    @ApiOperation(value = "기부 신청")
    @ApiResponses({
            @ApiResponse(code = 201, message = "기부글 신청에 성공했습니다."),
            @ApiResponse(code = 404, message = "해당 신청자 정보를 찾을 수 없습니다."),
            @ApiResponse(code = 409, message = "신청자에 대한 기부글이 이미 존재합니다."),
            @ApiResponse(code = 409, message = "기부글 신청에 실패했습니다.")
    })
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<? extends BaseResponseDTO> register(
            @ApiParam(value = "기부 신청 정보", required = true) @RequestPart DonationInfoRequestDTO donationInfoRequestDTO,
            @ApiParam(value = "관계증명서") @RequestPart(value = "certificate", required = false) MultipartFile certificate,
            @ApiParam(value = "대표 사진") @RequestPart(value = "image", required = false) MultipartFile image,
            @ApiParam(value = "증빙 자료", required = true) @RequestPart(value = "evidence") List<MultipartFile> evidence
    ) {

        try {
            if (!donationService.createDonation(donationInfoRequestDTO, certificate, image, evidence)) {
                return ResponseEntity.status(409).body(BaseResponseDTO.of("신청자에 대한 기부글이 이미 존재합니다.", 409));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 신청자 정보를 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("기부글 신청에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("기부글 신청에 성공했습니다.", 201));

    }

    @ApiOperation(value = "기부글 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "기부글 목록 조회에 성공했습니다."),
            @ApiResponse(code = 404, message = "기부글 목록을 찾을 수 없습니다."),
            @ApiResponse(code = 409, message = "기부글 목록 조회에 실패했습니다.")
    })
    @GetMapping
    public ResponseEntity<? extends BaseResponseDTO> getList(String category) {

        DonationGetListWrapperResponseDTO donationGetListWrapperResponseDTO = null;

        try {
            donationGetListWrapperResponseDTO = donationService.getDonationList(category);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("기부글 목록을 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("기부글 목록 조회에 실패했습니다.", 409));
        }

        return ResponseEntity.ok(DonationGetListWrapperResponseDTO.of("기부글 목록 조회에 성공했습니다.", 200, donationGetListWrapperResponseDTO));

    }

    @ApiOperation(value = "기부글 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "기부글 조회에 성공했습니다."),
            @ApiResponse(code = 404, message = "기부글을 찾을 수 없습니다."),
            @ApiResponse(code = 409, message = "기부글 조회에 실패했습니다.")
    })
    @GetMapping("/{donationId}")
    public ResponseEntity<? extends BaseResponseDTO> get(
            @ApiParam(value = "기부글 ID", required = true) @PathVariable String donationId) {

        DonationResponseDTO donationResponseDTO = null;

        try {
            donationResponseDTO = donationService.getDonation(donationId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("기부글을 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("기부글 조회에 실패했습니다.", 409));
        }

        return ResponseEntity.ok(DonationResponseDTO.of("기부글 조회에 성공했습니다.", 200, donationResponseDTO));

    }

    @ApiOperation(value = "기부글 추천")
    @ApiResponses({
            @ApiResponse(code = 200, message = "기부글 추천에 성공했습니다."),
            @ApiResponse(code = 404, message = "기부글을 찾을 수 없습니다."),
            @ApiResponse(code = 409, message = "기부글 추천에 실패했습니다.")
    })
    @GetMapping("/recommend/{donationId}")
    public ResponseEntity<? extends BaseResponseDTO> recommend(
            @ApiParam(value = "기부글 ID", required = true) @PathVariable String donationId) {

        DonationRecommendResponseDTO donationRecommendResponseDTO = null;

        try {
            donationRecommendResponseDTO = donationService.recommendDonation(donationId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("기부글을 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("기부글 추천에 실패했습니다.", 409));
        }

        return ResponseEntity.ok(DonationRecommendResponseDTO.of("기부글 추천에 성공했습니다.", 200, donationRecommendResponseDTO));

    }

    @ApiOperation(value = "기부글 검색")
    @ApiResponses({
            @ApiResponse(code = 200, message = "기부글 검색에 성공했습니다."),
            @ApiResponse(code = 404, message = "기부글을 찾을 수 없습니다."),
            @ApiResponse(code = 409, message = "기부글 검색에 실패했습니다.")
    })
    @GetMapping("/search")
    public ResponseEntity<? extends BaseResponseDTO> search(
            @ApiParam(value = "검색 유형", required = true) @RequestParam String type,
            @ApiParam(value = "검색어", required = true) @RequestParam String keyword
    ) {

        DonationGetListWrapperResponseDTO donationGetListWrapperResponseDTO = null;

        try {
            donationGetListWrapperResponseDTO = donationService.searchDonation(type, keyword);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("기부글을 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("기부글 검색에 실패했습니다.", 409));
        }

        return ResponseEntity.ok(DonationGetListWrapperResponseDTO.of("기부글 검색에 성공했습니다.", 200, donationGetListWrapperResponseDTO));

    }

}
