package com.doners.donersbackend.domain.repository;

import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.epilogue.Epilogue;
import com.doners.donersbackend.domain.dao.image.Image;
import com.doners.donersbackend.domain.dao.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, String> {

    Optional<Image> findByUser(User user);

    Optional<Image> findByUserAndImageIsResized(User user, boolean isResized);

    Optional<Image> findByDonationAndImageIsResized(Donation donation, boolean isResized);

    Optional<Image> findByEpilogueAndImageIsResized(Epilogue epilogue, boolean isResized);

}
