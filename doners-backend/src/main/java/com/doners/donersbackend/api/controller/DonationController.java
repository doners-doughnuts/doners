package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.application.dto.request.donation.DonationApproveRequestDTO;
import com.doners.donersbackend.application.dto.request.donation.DonationRegisterPostDTO;
import com.doners.donersbackend.application.dto.request.donation.DonationRecommendPatchDTO;
import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import com.doners.donersbackend.application.dto.response.donation.DonationCheckResponseDTO;
import com.doners.donersbackend.application.dto.response.donation.DonationGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.donation.DonationRecommendResponseDTO;
import com.doners.donersbackend.application.dto.response.donation.DonationResponseDTO;
import com.doners.donersbackend.application.service.DonationService;
import com.doners.donersbackend.domain.enums.CategoryCode;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Api(value = "Donation API", tags = {"Donation"})
@CrossOrigin("*")
@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/donation")
public class DonationController {

    private final DonationService donationService;

    @ApiOperation(value = "기부 신청")
    @ApiResponses({
            @ApiResponse(code = 201, message = "기부글 신청에 성공했습니다."),
            @ApiResponse(code = 404, message = "신청자 정보를 찾을 수 없습니다."),
            @ApiResponse(code = 409, message = "신청자의 기부글이 이미 존재합니다."),
            @ApiResponse(code = 409, message = "기부글 신청에 실패했습니다.")
    })
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<? extends BaseResponseDTO> register(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @ApiParam(value = "기부 신청 정보", required = true) @Valid @RequestPart DonationRegisterPostDTO donationRegisterPostDTO,
            @ApiParam(value = "관계증명서") @RequestPart(required = false) MultipartFile certificate,
            @ApiParam(value = "대표 사진") @RequestPart(required = false) MultipartFile image,
            @ApiParam(value = "증빙 자료", required = true) @RequestPart List<MultipartFile> evidence
    ) {

        try {
            if (!donationService.createDonation(accessToken, donationRegisterPostDTO, certificate, image, evidence)) {
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
    public ResponseEntity<? extends BaseResponseDTO> getList(
            @ApiParam(value = "카테고리", required = true) @NotNull @RequestParam CategoryCode category,
            @ApiParam(value = "페이지 번호", required = true) @RequestParam(defaultValue = "1") int page,
            @ApiParam(value = "정렬 기준", required = true) @RequestParam(defaultValue = "1") int sort,
            @ApiParam(value = "보기 기준", required = true) @RequestParam(defaultValue = "false") boolean view
    ) {

        DonationGetListWrapperResponseDTO donationGetListWrapperResponseDTO = null;

        try {
            donationGetListWrapperResponseDTO = donationService.getDonationList(category, page, sort, view);
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
            @ApiParam(value = "기부글 ID", required = true) @NotBlank @PathVariable String donationId
    ) {

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
    @PatchMapping("/recommend")
    public ResponseEntity<? extends BaseResponseDTO> recommend(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @ApiParam(value = "기부글 정보", required = true) @Valid @RequestBody DonationRecommendPatchDTO donationRecommendPatchDTO
    ) {

        DonationRecommendResponseDTO donationRecommendResponseDTO = null;

        try {
            donationRecommendResponseDTO = donationService.recommendDonation(accessToken, donationRecommendPatchDTO);
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
            @ApiParam(value = "카테고리", required = true) @NotNull @RequestParam CategoryCode category,
            @ApiParam(value = "검색 유형", required = true) @NotBlank @RequestParam String type,
            @ApiParam(value = "검색어", required = true) @RequestParam String keyword,
            @ApiParam(value = "페이지 번호", required = true) @RequestParam(defaultValue = "1") int page,
            @ApiParam(value = "보기 기준", required = true) @RequestParam(defaultValue = "false") boolean view
    ) {

        DonationGetListWrapperResponseDTO donationGetListWrapperResponseDTO = null;

        try {
            donationGetListWrapperResponseDTO = donationService.searchDonation(category, type, keyword, page, view);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("기부글을 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("기부글 검색에 실패했습니다.", 409));
        }

        return ResponseEntity.ok(DonationGetListWrapperResponseDTO.of("기부글 검색에 성공했습니다.", 200, donationGetListWrapperResponseDTO));

    }

    @ApiOperation(value = "기부글 신청 승인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "기부글 신청이 승인되었습니다."),
            @ApiResponse(code = 200, message = "기부글 신청이 거절되었습니다."),
            @ApiResponse(code = 401, message = "기부글 승인 권한이 없습니다."),
            @ApiResponse(code = 404, message = "기부글을 찾을 수 없습니다."),
            @ApiResponse(code = 409, message = "이미 승인된 기부글 입니다."),
            @ApiResponse(code = 409, message = "기부글 신청 승인에 실패했습니다.")
    })
    @PatchMapping("/approve")
    public ResponseEntity<? extends BaseResponseDTO> approve(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @ApiParam(value = "기부글 승인 정보", required = true) @Valid @RequestBody DonationApproveRequestDTO donationApproveRequestDTO
    ) {

        try {
            Integer result = donationService.approveDonation(accessToken, donationApproveRequestDTO);

            if (result == 0) {
                return ResponseEntity.status(401).body(BaseResponseDTO.of("기부글 승인 권한이 없습니다.", 401));
            } else if (result == 1) {
                return ResponseEntity.status(409).body(BaseResponseDTO.of("이미 승인된 기부글 입니다.", 409));
            } else if (result == 2) {
                return ResponseEntity.ok(BaseResponseDTO.of("기부글 신청이 거절되었습니다.", 200));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("기부글을 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("기부글 신청 승인에 실패했습니다.", 409));
        }

        return ResponseEntity.ok(BaseResponseDTO.of("기부글 신청이 승인되었습니다.", 200));

    }

    @ApiOperation(value = "기부글 신청 기록 확인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "기부글 신청 기록이 이미 존재합니다."),
            @ApiResponse(code = 200, message = "기부글 신청 기록이 존재하지 않습니다."),
            @ApiResponse(code = 409, message = "기부글 신청 기록 확인에 실패했습니다.")
    })
    @GetMapping("/check")
    public ResponseEntity<? extends BaseResponseDTO> check(
            @ApiIgnore @RequestHeader("Authorization") String accessToken
    ) {

        try {
            DonationCheckResponseDTO donationCheckResponseDTO = donationService.checkDonation(accessToken);

            if (donationCheckResponseDTO.isApply()) {
                return ResponseEntity.ok(DonationCheckResponseDTO.of("기부글 신청 기록이 이미 존재합니다.", 200, donationCheckResponseDTO));
            }

            return ResponseEntity.ok(DonationCheckResponseDTO.of("기부글 신청 기록이 존재하지 않습니다.", 200, donationCheckResponseDTO));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("기부글 신청 기록 확인에 실패했습니다.", 409));
        }

    }

}
