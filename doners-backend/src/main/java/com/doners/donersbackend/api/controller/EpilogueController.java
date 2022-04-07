package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.application.dto.request.epilogue.EpilogueChangePatchDTO;
import com.doners.donersbackend.application.dto.request.epilogue.EpilogueRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueCheckResponseDTO;
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
    @ApiOperation(value="에필로그 생성")
    @ApiResponses({
            @ApiResponse(code=201, message="에필로그를 생성했습니다."),
            @ApiResponse(code = 404, message = "작성자 정보를 찾을 수 없습니다."),
            @ApiResponse(code=409, message="에필로그를 생성하지 못했습니다")
    })
    public ResponseEntity<? extends BaseResponseDTO> registerEpilogue(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @Valid @ApiParam(value="에필로그 정보", required=true) @RequestPart EpilogueRegisterPostDTO epilogueRegisterPostDTO,
            @ApiParam(value = "썸네일 사진") @Valid @RequestPart(value = "multipartFile", required = false) MultipartFile multipartFile) {

        try {
            epilogueService.registerEpilogue(accessToken, epilogueRegisterPostDTO, multipartFile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("작성자 정보를 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("에필로그를 생성하지 못했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("에필로그를 생성했습니다.", 201));
    }

    @PatchMapping
    @ApiOperation(value="에필로그 내용 수정")
    @ApiResponses({
            @ApiResponse(code=200, message="에필로그 내용을 수정했습니다."),
            @ApiResponse(code=404, message="해당 에필로그를 찾을 수 없습니다."),
            @ApiResponse(code=409, message="에필로그 내용을 수정하지 못했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> changeEpilogue(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid @ApiParam(value="수정할 에필로그 내용", required=true) EpilogueChangePatchDTO epilogueChangePatchDTO) {

        try {
            Integer statusCode = epilogueService.changeEpilogue(accessToken, epilogueChangePatchDTO);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("에필로그 내용을 수정하지 못했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 에필로그를 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("에필로그 내용을 수정했습니다.", 200));
    }

    @DeleteMapping("/{epilogueId}")
    @ApiOperation(value="에필로그 삭제")
    @ApiResponses({
            @ApiResponse(code=200, message="에필로그를 삭제했습니다."),
            @ApiResponse(code=404, message="해당 에필로그를 찾을 수 없습니다."),
            @ApiResponse(code=409, message="에필로그를 삭제하지 못했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteEpilogue(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("epilogueId") @ApiParam(value="에필로그 ID", required=true) String epilogueId) {

        try {
            Integer statusCode = epilogueService.deleteEpilogue(accessToken, epilogueId);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("에필로그를 삭제하지 못했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 에필로그를 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("에필로그를 삭제했습니다.", 200));
    }

    @GetMapping("/list/{sequence}")
    @ApiOperation(value="에필로그 목록 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="에필로그 목록을 불러왔습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getEpilogueList(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("sequence") @ApiParam(value="", required=true) int sequence) {

        return ResponseEntity.ok(EpilogueGetListWrapperResponseDTO.of("에필로그 목록을 불러왔습니다.", 200, epilogueService.getEpilogueList(accessToken, sequence)));
    }

    @GetMapping("/{epilogueId}")
    @ApiOperation(value="에필로그 상세내용 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="에필로그 상세내용을 불러왔습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getEpilogue(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("epilogueId") @ApiParam(value="에필로그 ID", required=true) String epilogueId) {

        return ResponseEntity.ok(EpilogueResponseDTO.of("에필로그 상세내용을 불러왔습니다.", 200, epilogueService.getEpilogue(accessToken, epilogueId)));
    }

    @ApiOperation(value = "에필로그 존재 여부 확인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "해당 기부에 대한 에필로그 존재 여부를 불러왔습니다."),
            @ApiResponse(code = 409, message = "해당 기부에 대한 에필로그 존재 여부를 불러오지 못했습니다.")
    })
    @GetMapping("/check/{donationId}")
    public ResponseEntity<? extends BaseResponseDTO> checkIfEpilogueExists(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("donationId") @ApiParam(value="기부 ID", required=true) String donationId) {
        EpilogueCheckResponseDTO epilogueCheckResponseDTO = null;

        try {
            epilogueCheckResponseDTO = epilogueService.checkIfEpilogueExists(accessToken, donationId);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("해당 기부에 대한 에필로그 존재 여부를 불러오지 못했습니다.", 409));
        }

        return ResponseEntity.status(200).body(EpilogueCheckResponseDTO.of("해당 기부에 대한 에필로그 존재 여부를 불러왔습니다.", 200, epilogueCheckResponseDTO));
    }
}
