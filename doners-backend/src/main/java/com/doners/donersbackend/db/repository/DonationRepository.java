package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.donation.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, String> {

    Optional<Donation> findByUserIdAndIsDeleted(String userId, boolean isDeleted);

    Optional<List<Donation>> findByCategoryAndIsDeleted(String category, boolean isDeleted);

    boolean existsByIdAndIsDeleted(String donationId, boolean isDeleted);

}
