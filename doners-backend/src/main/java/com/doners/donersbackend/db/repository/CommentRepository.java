package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.Comment;
import com.doners.donersbackend.db.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,String> {
    Optional<List<Comment>> findAllByCommunity(Community community);
}
