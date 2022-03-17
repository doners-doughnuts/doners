package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.CommentChangePatchDTO;
import com.doners.donersbackend.api.dto.request.CommentRegisterPostDTO;
import com.doners.donersbackend.db.entity.Comment;
import com.doners.donersbackend.db.repository.AppreciationRepository;
import com.doners.donersbackend.db.repository.CommentRepository;
import com.doners.donersbackend.db.repository.CommunityRepository;
import com.doners.donersbackend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final CommunityRepository communityRepository;
    private final AppreciationRepository appreciationRepository;
    private final UserRepository userRepository;

    @Override
    public void registerComment(CommentRegisterPostDTO commentRegisterPostDTO) {
        // 댓글 작성 정보
        Comment comment = Comment.builder()
                .commentDescription(commentRegisterPostDTO.getCommentDescription())
                .user(userRepository.findByUserAccount(commentRegisterPostDTO.getUserAccount()).get())
                .commentCreateTime(LocalDateTime.now()).build();

        if(commentRegisterPostDTO.getCommunityId().length()==0){// 감사 글 댓글
            comment.changeAppreciationId(appreciationRepository.findById(commentRegisterPostDTO.getAppreciationId()).get());
        }else{// 커뮤니티 글 댓글
            comment.changeCommunityId(communityRepository.findById(commentRegisterPostDTO.getCommunityId()).get());
        }
        commentRepository.save(comment);
    }

    @Override
    public Integer changeComment(String commentId, CommentChangePatchDTO commentChangePatchDTO) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글을 찾을 수 없습니다."));

        try {
            comment.changeComment(commentChangePatchDTO.getCommentDescription());
        } catch(Exception e) {
            return 409;
        }

        commentRepository.save(comment);
        return 200;
    }

    @Override
    public Integer deleteComment(String commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글을 찾을 수 없습니다."));

        try {
            comment.deleteComment();
        } catch(Exception e) {
            return 409;
        }

        commentRepository.save(comment);
        return 200;
    }
}
