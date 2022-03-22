package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.api.dto.request.AppreciationChangePatchDTO;
import com.doners.donersbackend.api.dto.request.AppreciationRegisterPostDTO;
import com.doners.donersbackend.api.dto.response.AppreciationGetListWrapperResponseDTO;
import com.doners.donersbackend.api.dto.response.AppreciationResponseDTO;
import com.doners.donersbackend.api.dto.response.CommunityResponseDTO;
import com.doners.donersbackend.api.service.AppreciationService;
import com.doners.donersbackend.api.service.AwsS3Service;
import com.doners.donersbackend.common.model.BaseResponseDTO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@Api(value="Appreciation API", tags={"Appreciation"})
@RequiredArgsConstructor
@RequestMapping("/api/appreciation")
public class AppreciationController {

    private final AwsS3Service awsS3Service;
    private final AppreciationService appreciationService;

    @PostMapping("/register")
    @ApiOperation(value="필수 게시글 정보 입력 - 제목, 내용, 작성자 유저 주소")
    @ApiResponses({
            @ApiResponse(code=201, message="필수 게시글 정보 입력에 성공했습니다."),
            @ApiResponse(code=409, message="필수 게시글 정보 입력에 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDTO> setAppreciationRegister(
            @RequestBody @Valid @ApiParam(value="필수 게시글 정보", required=true) AppreciationRegisterPostDTO appreciationRegisterPostDTO) {
        try {
            appreciationService.appreciationRegister(appreciationRegisterPostDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("필수 게시글 정보 입력에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("필수 게시글 정보 입력에 성공했습니다.", 201));
    }

    @PatchMapping("/{appreciationId}")
    @ApiOperation(value="글 변경 , 필수 정보 - 제목, 내용, 글id")
    @ApiResponses({
            @ApiResponse(code=200, message="글 변경에 성공했습니다."),
            @ApiResponse(code=404, message="해당 글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="글 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> changeAppreciation(
            @PathVariable("appreciationId") @ApiParam(value="글id", required=true) String appreciationId,
            @RequestBody @Valid @ApiParam(value="필수 게시글 정보", required=true) AppreciationChangePatchDTO appreciationChangePatchDTO) {

        try {
            Integer statusCode = appreciationService.changeAppreciation(appreciationId,appreciationChangePatchDTO);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("글 변경에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 글을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("글 변경에 성공했습니다.", 200));
    }

    @DeleteMapping("/delete/{appreciationId}")
    @ApiOperation(value="글 삭제 , 필수 정보 - 글id")
    @ApiResponses({
            @ApiResponse(code=200, message="글 삭제에 성공했습니다."),
            @ApiResponse(code=404, message="해당 글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="글 삭제에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteAppreciation(
            @PathVariable("appreciationId") @ApiParam(value="글id", required=true) String appreciationId) {

        try {
            Integer statusCode = appreciationService.deleteAppreciation(appreciationId);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("글 삭제에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 글을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("글 삭제에 성공했습니다.", 200));
    }

    @GetMapping
    @ApiOperation(value="감사 글 목록 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="감사 글 목록 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getAppreciationList() {

        return ResponseEntity.ok(AppreciationGetListWrapperResponseDTO.of("감사글 목록 조회 성공", 200, appreciationService.getAppreciationList()));
    }

    @PostMapping("/image")
    @ApiOperation(value="감사글 썸네일 이미지 등록")
    @ApiResponses({
            @ApiResponse(code=201, message="이미지 등록에 성공했습니다."),
            @ApiResponse(code=409, message="썸네일 이미지 등록에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> uploadAppreciationThumbnailImage(
            @ApiParam(value="썸네일 이미지", required=true) @RequestPart MultipartFile multipartFile) {
        try {
            //Todo
//            awsS3Service.uploadProfileImage(multipartFile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("회원 정보를 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("썸네일 이미지 등록에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("썸네일 이미지 등록에 성공했습니다.", 201));
    }

    @GetMapping("/{appreciationId}")
    @ApiOperation(value="커뮤니티 글 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="글 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getAppreciation(
            @PathVariable("appreciationId") @ApiParam(value="글id", required=true) String appreciationId) {

        return ResponseEntity.ok(AppreciationResponseDTO.of("감사 글 목록 조회 성공", 200, appreciationService.getAppreciation(appreciationId)));
    }
}
