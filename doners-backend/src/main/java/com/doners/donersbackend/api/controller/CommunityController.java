package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.application.dto.request.community.CommunityChangePatchDTO;
import com.doners.donersbackend.application.dto.request.community.CommunityRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityResponseDTO;
import com.doners.donersbackend.application.service.CommunityService;
import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@Api(value="Community API", tags={"Community"})
@RequiredArgsConstructor
@RequestMapping("/api/community")
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping
    @ApiOperation(value="필수 게시글 정보 입력 - 제목, 내용, 작성자 유저 주소")
    @ApiResponses({
            @ApiResponse(code=201, message="필수 게시글 정보 입력에 성공했습니다."),
            @ApiResponse(code=409, message="필수 게시글 정보 입력에 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDTO> setCommunityRegister(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid @ApiParam(value="필수 게시글 정보", required=true) CommunityRegisterPostDTO communityRegisterPostDTO) {
        try {
            communityService.communityRegister(accessToken, communityRegisterPostDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("필수 게시글 정보 입력에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("필수 게시글 정보 입력에 성공했습니다.", 201));
    }

    @PatchMapping
    @ApiOperation(value="글 변경 , 필수 정보 - 제목, 내용, 글id")
    @ApiResponses({
            @ApiResponse(code=200, message="글 변경에 성공했습니다."),
            @ApiResponse(code=404, message="해당 글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="글 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> changeCommunity(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid  @ApiParam(value="필수 게시글 정보", required=true) CommunityChangePatchDTO communityChangePatchDTO) {

        try {
            Integer statusCode = communityService.changeCommunity(accessToken, communityChangePatchDTO);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("글 변경에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 글을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("글 변경에 성공했습니다.", 200));
    }

    @DeleteMapping("/{communityId}")
    @ApiOperation(value="글 삭제 , 필수 정보 - 글id")
    @ApiResponses({
            @ApiResponse(code=200, message="글 삭제에 성공했습니다."),
            @ApiResponse(code=404, message="해당 글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="글 삭제에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteCommunity(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("communityId") @ApiParam(value="글id", required=true) String communityId) {

        try {
            Integer statusCode = communityService.deleteCommunity(accessToken, communityId);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("글 삭제에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 글을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("글 삭제에 성공했습니다.", 200));
    }

    @GetMapping("/list/{sequence}")
    @ApiOperation(value="커뮤니티 글 목록 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="글 목록 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getCommunityList(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("sequence") @ApiParam(value="", required=true) int sequence) {

        return ResponseEntity.ok(CommunityGetListWrapperResponseDTO.of("커뮤니티 글 목록 조회 성공", 200, communityService.getCommunityList(accessToken, sequence)));
    }

    @GetMapping("/{communityId}")
    @ApiOperation(value="커뮤니티 글 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="글 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getCommunity(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("communityId") @ApiParam(value="글id", required=true) String communityId) {

        return ResponseEntity.ok(CommunityResponseDTO.of("커뮤니티 글 목록 조회 성공", 200, communityService.getCommunity(accessToken, communityId)));
    }
}
