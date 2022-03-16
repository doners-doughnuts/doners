package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.donation.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, String> {

    Optional<Donation> findByUserId(String userId);

}
