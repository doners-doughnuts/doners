package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.application.dto.request.comment.CommentChangePatchDTO;
import com.doners.donersbackend.application.dto.request.comment.CommentRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.comment.CommentGetListWrapperResponseDTO;
import com.doners.donersbackend.application.service.CommentService;
import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@Api(value="Comment API", tags={"Comment"})
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    @ApiOperation(value="필수 댓글 정보 입력 - 내용,글 id ,작성자 유저 주소")
    @ApiResponses({
            @ApiResponse(code=201, message="필수 댓글 정보 입력에 성공했습니다."),
            @ApiResponse(code=409, message="필수 댓글 정보 입력에 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDTO> registerComment(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid @ApiParam(value="추가할 댓글 정보", required=true) CommentRegisterPostDTO commentRegisterPostDTO) {
        try {
            commentService.registerComment(accessToken, commentRegisterPostDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("필수 댓글 정보 입력에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("필수 댓글 정보 입력에 성공했습니다.", 201));
    }

    @PatchMapping
    @ApiOperation(value="댓글 변경 , 필수 정보 - 내용, 댓글 id")
    @ApiResponses({
            @ApiResponse(code=200, message="댓글 변경에 성공했습니다."),
            @ApiResponse(code=404, message="해당 댓글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="댓글 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> changeComment(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid @ApiParam(value="수정할 댓글 내용", required=true) CommentChangePatchDTO commentChangePatchDTO) {

        try {
            Integer statusCode = commentService.changeComment(accessToken, commentChangePatchDTO);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("댓글 변경에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 댓글을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("댓글 변경에 성공했습니다.", 200));
    }

    @DeleteMapping("/delete/{commentId}")
    @ApiOperation(value="댓글 삭제")
    @ApiResponses({
            @ApiResponse(code=200, message="댓글 삭제에 성공했습니다."),
            @ApiResponse(code=404, message="해당 댓글을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="댓글 삭제에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteComment(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("commentId") @ApiParam(value="댓글 ID", required=true) String commentId) {

        try {
            Integer statusCode = commentService.deleteComment(accessToken, commentId);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("댓글 삭제에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 댓글을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("댓글 삭제에 성공했습니다.", 200));
    }

    @GetMapping("/community/{communityId}")
    @ApiOperation(value="커뮤니티 글 댓글 리스트 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="커뮤니티 글에 달린 댓글 리스트 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getCommunityCommentList(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("communityId") @ApiParam(value="커뮤니티 ID", required=true) String communityId) {

        return ResponseEntity.ok(CommentGetListWrapperResponseDTO.of(200,"커뮤니티 댓글 목록 조회 성공", commentService.getCommunityCommentList(accessToken, communityId)));
    }

    @GetMapping("/epilogue/{epilogueId}")
    @ApiOperation(value="에필로그 글 댓글 리스트 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="에필로그 글에 달린 댓글 리스트 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getEpilogueCommentList(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("epilogueId") @ApiParam(value="에필로그 ID", required=true) String epilogueId) {

        return ResponseEntity.ok(CommentGetListWrapperResponseDTO.of(200,"감사 글 댓글 목록 조회 성공", commentService.getEpilogueCommentList(accessToken, epilogueId)));
    }

    @GetMapping("/subComment/{commentId}")
    @ApiOperation(value="대댓글 리스트 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="대댓글 리스트 조회에 성공했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getSubComment(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("commentId") @ApiParam(value="댓글 ID", required=true) String commentId) {

        return ResponseEntity.ok(CommentGetListWrapperResponseDTO.of(200,"대댓글 목록 조회 성공", commentService.getSubCommentList(accessToken, commentId)));
    }
}
