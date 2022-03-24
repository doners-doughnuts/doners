package com.doners.donersbackend.domain.repository;

import com.doners.donersbackend.domain.dao.epilouge.Epilouge;
import com.doners.donersbackend.domain.dao.Comment;
import com.doners.donersbackend.domain.dao.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,String> {
    Optional<List<Comment>> findAllByCommunityAndCommentIsDeletedOrderByCommentCreateTime(Community community,boolean isDeleted);
    Optional<List<Comment>> findAllByEpilougeAndCommentIsDeletedOrderByCommentCreateTime(Epilouge epilouge, boolean isDeleted);
    Optional<List<Comment>> findAllByParentCommentIdAndCommentIsDeletedOrderByCommentCreateTime(Comment comment,boolean isDeleted);
}
