package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.application.dto.request.epilogue.EpilogueChangePatchDTO;
import com.doners.donersbackend.application.dto.request.epilogue.EpilogueRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueResponseDTO;
import com.doners.donersbackend.application.service.EpilogueService;
import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@Api(value="Epilogue API", tags={"Epilogue"})
@RequiredArgsConstructor
@RequestMapping("/api/epilogue")
public class EpilogueController {

    private final EpilogueService epilogueService;

    @PostMapping
    @ApiOperation(value="필수 게시글 정보 입력 - 제목, 내용, 작성자 유저 주소")
    @ApiResponses({
            @ApiResponse(code=201, message="필수 게시글 정보 입력에 성공했습니다."),
            @ApiResponse(code = 404, message = "해당 작성자 정보를 찾을 수 없습니다."),
            @ApiResponse(code=409, message="필수 게시글 정보 입력에 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDTO> registerEpilogue(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid @ApiParam(value="필수 게시글 정보", required=true) EpilogueRegisterPostDTO epilogueRegisterPostDTO,
            @ApiParam(value = "썸네일 사진") @Valid @RequestPart(value = "image", required = false) MultipartFile image) {

        try {
            epilogueService.registerEpilogue(accessToken, epilogueRegisterPostDTO, image);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 작성자 정보를 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("게시글 입력에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("필수 게시글 정보 입력에 성공했습니다.", 201));
    }

    @PatchMapping
    @ApiOperation(value="에필로그 내용 수정 - 제목, 내용")
    @ApiResponses({
            @ApiResponse(code=200, message="글 변경에 성공했습니다."),
            @ApiResponse(code=404, message="해당 글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="글 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> changeEpilogue(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid @ApiParam(value="필수 게시글 정보", required=true) EpilogueChangePatchDTO epilogueChangePatchDTO) {

        try {
            Integer statusCode = epilogueService.changeEpilogue(accessToken, epilogueChangePatchDTO);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("글 변경에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 글을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("글 변경에 성공했습니다.", 200));
    }

    @DeleteMapping("/{epilogueId}")
    @ApiOperation(value="글 삭제 , 필수 정보 - 글id")
    @ApiResponses({
            @ApiResponse(code=200, message="글 삭제에 성공했습니다."),
            @ApiResponse(code=404, message="해당 글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="글 삭제에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteEpilogue(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("epilogueId") @ApiParam(value="에필로그 ID", required=true) String epilogueId) {

        try {
            Integer statusCode = epilogueService.deleteEpilogue(accessToken, epilogueId);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("글 삭제에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 글을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("글 삭제에 성공했습니다.", 200));
    }

    @GetMapping("/list/{sequence}")
    @ApiOperation(value="감사 글 목록 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="감사 글 목록 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getEpilogueList(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("sequence") @ApiParam(value="", required=true) int sequence) {

        return ResponseEntity.ok(EpilogueGetListWrapperResponseDTO.of("에필로그 목록 조회 성공", 200, epilogueService.getEpilogueList(accessToken, sequence)));
    }

    @GetMapping("/{epilogueId}")
    @ApiOperation(value="에필로그 상세내용 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="글 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getEpilogue(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("epilogueId") @ApiParam(value="에필로그 ID", required=true) String epilogueId) {

        return ResponseEntity.ok(EpilogueResponseDTO.of("감사 글 목록 조회 성공", 200, epilogueService.getEpilogue(accessToken, epilogueId)));
    }
}
