package com.doners.donersbackend.domain.repository;

import com.doners.donersbackend.domain.dao.epilogue.Epilogue;
import com.doners.donersbackend.domain.dao.comment.Comment;
import com.doners.donersbackend.domain.dao.community.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,String> {
    Optional<List<Comment>> findAllByCommunityAndCommentIsDeleted(Community community, boolean isDeleted);
    Optional<List<Comment>> findAllByCommunityAndCommentIsDeletedOrderByCommentCreateTime(Community community, boolean isDeleted);
    Optional<List<Comment>> findAllByEpilougeAndCommentIsDeletedOrderByCommentCreateTime(Epilogue epilouge, boolean isDeleted);
    Optional<List<Comment>> findAllByParentCommentIdAndCommentIsDeletedOrderByCommentCreateTime(Comment comment, boolean isDeleted);
}
