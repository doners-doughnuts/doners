package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.CommentChangePatchDTO;
import com.doners.donersbackend.api.dto.request.CommentRegisterPostDTO;
import com.doners.donersbackend.api.dto.response.comment.CommentGetListWrapperResponseDTO;

public interface CommentService {
    // 댓글 작성 : 필수 글 정보 입력 - 제목, 내용
    void registerComment(CommentRegisterPostDTO commentRegisterPostDTO);
    // 댓글 변경
    Integer changeComment(String commentId, CommentChangePatchDTO commentChangePatchDTO);
    // 댓글 삭제
    Integer deleteComment(String commentId);
    // 감사글 댓글 목록
    CommentGetListWrapperResponseDTO getAppreciationCommentList(String id);
    // 커뮤니티 댓글 목록
    CommentGetListWrapperResponseDTO getCommunityCommentList(String id);
}
