package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,String> {
}
