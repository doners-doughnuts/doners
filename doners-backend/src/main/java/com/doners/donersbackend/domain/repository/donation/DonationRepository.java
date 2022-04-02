package com.doners.donersbackend.domain.repository.donation;

import com.doners.donersbackend.domain.dao.user.User;
import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.enums.CategoryCode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, String> {

    Optional<List<Donation>> findByCategoryCodeAndIsApprovedAndIsDeleted(CategoryCode categoryCode, boolean approve, boolean delete, Pageable pageable);

    boolean existsByIdAndIsDeleted(String donationId, boolean delete);

    Optional<List<Donation>> findByIsApproved(boolean isApproved);

    Optional<List<Donation>> findByUserAndIsDeletedOrderByStartDateDesc(User user, boolean isDeleted);

    @Query("SELECT d FROM Donation d WHERE d.categoryCode = :categoryCode AND (d.title LIKE %:title% OR d.description LIKE %:description%)")
    Optional<List<Donation>> findByCategoryCodeAndTitleContainingOrDescriptionContaining(CategoryCode categoryCode, String title, String description, Pageable pageable);

    Optional<List<Donation>> findByCategoryCodeAndTitleContaining(CategoryCode category, String title, Pageable pageable);

    Optional<List<Donation>> findByCategoryCodeAndDescriptionContaining(CategoryCode category, String description, Pageable pageable);

    Optional<List<Donation>> findByCategoryCodeAndUser(CategoryCode category, User user, Pageable pageable);

    Optional<Donation> findByUserAndIsDeleted(User user, boolean delete);

}
