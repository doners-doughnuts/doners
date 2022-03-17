package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.AppreciationChangePatchDTO;
import com.doners.donersbackend.api.dto.request.AppreciationRegisterPostDTO;
import com.doners.donersbackend.api.dto.request.CommentChangePatchDTO;
import com.doners.donersbackend.api.dto.request.CommentRegisterPostDTO;

public interface CommentService {
    // 댓글 작성 : 필수 글 정보 입력 - 제목, 내용
    void registerComment(CommentRegisterPostDTO commentRegisterPostDTO);
    // 댓글 변경
    Integer changeComment(String commentId, CommentChangePatchDTO commentChangePatchDTO);
    // 댓글 삭제
    Integer deleteComment(String commentId);
}
