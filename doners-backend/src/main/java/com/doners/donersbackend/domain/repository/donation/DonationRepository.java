package com.doners.donersbackend.domain.repository.donation;

import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.user.User;
import com.doners.donersbackend.domain.enums.ApprovalStatusCode;
import com.doners.donersbackend.domain.enums.CategoryCode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, String> {

    Optional<List<Donation>> findByCategoryCodeAndIsApprovedAndIsDeleted(CategoryCode categoryCode, boolean approve, boolean delete, Pageable pageable);

    Optional<List<Donation>> findByCategoryCodeAndIsApprovedAndIsDeletedAndEndDateGreaterThanEqual(CategoryCode categoryCode, boolean approve, boolean delete, LocalDate today, Pageable pageable);

    boolean existsByIdAndIsDeleted(String donationId, boolean delete);

    Optional<List<Donation>> findByIsApprovedAndApprovalStatusCode(boolean isApproved, ApprovalStatusCode approvalStatusCode);

    Optional<List<Donation>> findByUserAndIsDeletedOrderByEndDateDesc(User user, boolean isDeleted);

    Optional<List<Donation>> findByUserAndIsDeletedOrderByStartDateDesc(User user, boolean isDeleted);

    @Query("SELECT d FROM Donation d WHERE d.categoryCode = :categoryCode AND (d.title LIKE %:title% OR d.description LIKE %:description%)")
    Optional<List<Donation>> findByCategoryCodeAndTitleContainingOrDescriptionContaining(CategoryCode categoryCode, String title, String description, Pageable pageable);

    Optional<List<Donation>> findByCategoryCodeAndTitleContaining(CategoryCode category, String title, Pageable pageable);

    Optional<List<Donation>> findByCategoryCodeAndDescriptionContaining(CategoryCode category, String description, Pageable pageable);

    Optional<List<Donation>> findByCategoryCodeAndUser(CategoryCode category, User user, Pageable pageable);

    @Query("SELECT d FROM Donation d WHERE d.categoryCode = :categoryCode AND (d.title LIKE %:title% OR d.description LIKE %:description%) AND d.endDate >= :today")
    Optional<List<Donation>> findByCategoryCodeAndTitleContainingOrDescriptionContainingAndEndDateGreaterThanEqual(CategoryCode categoryCode, String title, String description, LocalDate today, Pageable pageable);

    Optional<List<Donation>> findByCategoryCodeAndTitleContainingAndEndDateGreaterThanEqual(CategoryCode category, String title, LocalDate today, Pageable pageable);

    Optional<List<Donation>> findByCategoryCodeAndDescriptionContainingAndEndDateGreaterThanEqual(CategoryCode category, String description, LocalDate today, Pageable pageable);

    Optional<List<Donation>> findByCategoryCodeAndUserAndEndDateGreaterThanEqual(CategoryCode category, User user, LocalDate today, Pageable pageable);

    Optional<List<Donation>> findByUserOrderByEndDateDesc(User user);

    Optional<List<Donation>> findByUserAndIsApproved(User user, boolean approve);

    Optional<Donation> findByUserAndApprovalStatusCodeLessThanEqualAndEndDateGreaterThanEqual(User user, ApprovalStatusCode approvalStatusCode, LocalDate today);

}
