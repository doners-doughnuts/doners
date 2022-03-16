package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.Image;
import com.doners.donersbackend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, String> {
    Optional<Image> findByUser(User user);
    Optional<Image> findByUserAndImageIsResized(User user, boolean isResized);
}
