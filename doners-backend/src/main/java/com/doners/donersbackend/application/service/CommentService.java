package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.CommentChangePatchDTO;
import com.doners.donersbackend.application.dto.request.CommentRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.comment.CommentGetListWrapperResponseDTO;

public interface CommentService {
    // 댓글 작성 : 필수 글 정보 입력 - 제목, 내용
    void registerComment(CommentRegisterPostDTO commentRegisterPostDTO);
    // 댓글 변경
    Integer changeComment(String commentId, CommentChangePatchDTO commentChangePatchDTO);
    // 댓글 삭제
    Integer deleteComment(String commentId);
    // 감사글 댓글 목록
    CommentGetListWrapperResponseDTO getEpilogueCommentList(String id);
    // 커뮤니티 댓글 목록
    CommentGetListWrapperResponseDTO getCommunityCommentList(String id);
    // 감사글 대 댓글 목록
    CommentGetListWrapperResponseDTO getSubCommentList(String parentId);
}
