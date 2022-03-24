package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.api.dto.request.CommentChangePatchDTO;
import com.doners.donersbackend.api.dto.request.CommentRegisterPostDTO;
import com.doners.donersbackend.api.dto.response.comment.CommentGetListWrapperResponseDTO;
import com.doners.donersbackend.api.service.CommentService;
import com.doners.donersbackend.common.model.BaseResponseDTO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@Api(value="Comment API", tags={"Comment"})
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/register")
    @ApiOperation(value="필수 댓글 정보 입력 - 내용,글 id ,작성자 유저 주소")
    @ApiResponses({
            @ApiResponse(code=201, message="필수 댓글 정보 입력에 성공했습니다."),
            @ApiResponse(code=409, message="필수 댓글 정보 입력에 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDTO> setCommentRegister(
            @RequestBody @Valid @ApiParam(value="필수 게시글 정보", required=true) CommentRegisterPostDTO commentRegisterPostDTO) {
        try {
            commentService.registerComment(commentRegisterPostDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("필수 댓글 정보 입력에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("필수 댓글 정보 입력에 성공했습니다.", 201));
    }

    @PatchMapping("/{commentId}")
    @ApiOperation(value="댓글 변경 , 필수 정보 - 내용, 댓글 id")
    @ApiResponses({
            @ApiResponse(code=200, message="댓글 변경에 성공했습니다."),
            @ApiResponse(code=404, message="해당 댓글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="댓글 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> changeComment(
            @PathVariable("commentId") @ApiParam(value="댓글 id", required=true) String commentId,
            @RequestBody @Valid @ApiParam(value="필수 게시글 정보", required=true) CommentChangePatchDTO commentChangePatchDTO) {

        try {
            Integer statusCode = commentService.changeComment(commentId,commentChangePatchDTO);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("댓글 변경에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 댓글을 을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("댓글 변경에 성공했습니다.", 200));
    }

    @DeleteMapping("/delete/{commentId}")
    @ApiOperation(value="댓글 삭제 , 필수 정보 - 댓글 id")
    @ApiResponses({
            @ApiResponse(code=200, message="댓글 삭제에 성공했습니다."),
            @ApiResponse(code=404, message="해당 댓글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="댓글 삭제에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteCommunity(
            @PathVariable("commentId") @ApiParam(value="글id", required=true) String commentId) {

        try {
            Integer statusCode = commentService.deleteComment(commentId);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("댓글 삭제에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 댓글을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("댓글 삭제에 성공했습니다.", 200));
    }

    @GetMapping("/community/{communityId}")
    @ApiOperation(value="필수 댓글 정보 입력 - 글 id")
    @ApiResponses({
            @ApiResponse(code=200, message="필수 댓글 정보 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getCommunityComment(
            @PathVariable("communityId") @ApiParam(value="글id", required=true) String communityId) {

        return ResponseEntity.ok(CommentGetListWrapperResponseDTO.of(200,"커뮤니티 댓글 목록 조회 성공", commentService.getCommunityCommentList(communityId)));
    }

    @GetMapping("/appreciation/{appreciationId}")
    @ApiOperation(value="필수 댓글 정보 입력 - 글 id")
    @ApiResponses({
            @ApiResponse(code=200, message="필수 댓글 정보 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getAppreciationComment(
            @PathVariable("appreciationId") @ApiParam(value="글id", required=true) String appreciationId) {

        return ResponseEntity.ok(CommentGetListWrapperResponseDTO.of(200,"감사 글 댓글 목록 조회 성공", commentService.getEpilougeCommentList(appreciationId)));
    }

    @GetMapping("/subComment/{commentId}")
    @ApiOperation(value="필수 댓글 정보 입력 - 댓글 id")
    @ApiResponses({
            @ApiResponse(code=200, message="필수 댓글 정보 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getSubComment(
            @PathVariable("commentId") @ApiParam(value="댓글 id", required=true) String commentId) {

        return ResponseEntity.ok(CommentGetListWrapperResponseDTO.of(200,"대댓글 목록 조회 성공", commentService.getSubCommentList(commentId)));
    }
}
