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

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@Api(value="Epilogue API", tags={"Epilogue"})
@RequiredArgsConstructor
@RequestMapping("/api/epilogue")
public class EpilogueController {

    private final EpilogueService epilogueService;

    @PostMapping("/register")
    @ApiOperation(value="필수 게시글 정보 입력 - 제목, 내용, 작성자 유저 주소")
    @ApiResponses({
            @ApiResponse(code=201, message="필수 게시글 정보 입력에 성공했습니다."),
            @ApiResponse(code = 404, message = "해당 작성자 정보를 찾을 수 없습니다."),
            @ApiResponse(code=409, message="필수 게시글 정보 입력에 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDTO> setEpilogueServiceRegister(
            @RequestBody @Valid @ApiParam(value="필수 게시글 정보", required=true) EpilogueRegisterPostDTO epilogueRegisterPostDTO,
            @ApiParam(value = "썸네일 사진") @Valid @RequestPart(value = "image", required = false) MultipartFile image) {

        try {
            epilogueService.epilogueRegister(epilogueRegisterPostDTO,image);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 작성자 정보를 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("게시글 입력에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("필수 게시글 정보 입력에 성공했습니다.", 201));
    }

    @PatchMapping("/{epilogueServiceId}")
    @ApiOperation(value="글 변경 , 필수 정보 - 제목, 내용, 글id")
    @ApiResponses({
            @ApiResponse(code=200, message="글 변경에 성공했습니다."),
            @ApiResponse(code=404, message="해당 글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="글 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> changeEpilogueService(
            @PathVariable("epilogueServiceId") @ApiParam(value="글id", required=true) String epilogueServiceId,
            @RequestBody @Valid @ApiParam(value="필수 게시글 정보", required=true) EpilogueChangePatchDTO epilogueChangePatchDTO) {

        try {
            Integer statusCode = epilogueService.changeEpilogue(epilogueServiceId, epilogueChangePatchDTO);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("글 변경에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 글을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("글 변경에 성공했습니다.", 200));
    }

    @DeleteMapping("/delete/{epilogueServiceId}")
    @ApiOperation(value="글 삭제 , 필수 정보 - 글id")
    @ApiResponses({
            @ApiResponse(code=200, message="글 삭제에 성공했습니다."),
            @ApiResponse(code=404, message="해당 글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="글 삭제에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteEpilogueService(
            @PathVariable("epilogueServiceId") @ApiParam(value="글id", required=true) String epilogueServiceId) {

        try {
            Integer statusCode = epilogueService.deleteEpilogue(epilogueServiceId);

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
    public ResponseEntity<? extends BaseResponseDTO> getEpilogueServiceList() {

        return ResponseEntity.ok(EpilogueGetListWrapperResponseDTO.of("감사글 목록 조회 성공", 200, epilogueService.getEpilogueList()));
    }

    @GetMapping("/{epilogueServiceId}")
    @ApiOperation(value="커뮤니티 글 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="글 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getEpilogueService(
            @PathVariable("epilogueServiceId") @ApiParam(value="글id", required=true) String epilogueServiceId) {

        return ResponseEntity.ok(EpilogueResponseDTO.of("감사 글 목록 조회 성공", 200, epilogueService.getEpilogue(epilogueServiceId)));
    }
}
