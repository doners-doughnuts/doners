package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.comment.CommentChangePatchDTO;
import com.doners.donersbackend.application.dto.request.comment.CommentRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.comment.CommentGetListWrapperResponseDTO;

public interface CommentService {
    void registerComment(String accessToken, CommentRegisterPostDTO commentRegisterPostDTO);
    // 댓글 변경
    Integer changeComment(String accessToken, CommentChangePatchDTO commentChangePatchDTO);
    // 댓글 삭제
    Integer deleteComment(String accessToken, String commentId);
    // 감사글 댓글 목록
    CommentGetListWrapperResponseDTO getEpilogueCommentList(String accessToken, String id);
    // 커뮤니티 댓글 목록
    CommentGetListWrapperResponseDTO getCommunityCommentList(String accessToken, String id);
    // 감사글 대 댓글 목록
    CommentGetListWrapperResponseDTO getSubCommentList(String accessToken, String parentId);
}
