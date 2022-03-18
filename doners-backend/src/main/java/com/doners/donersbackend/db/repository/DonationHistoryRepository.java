package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.donation.Donation;
import com.doners.donersbackend.db.entity.donation.DonationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationHistoryRepository extends JpaRepository<DonationHistory, String> {

    Optional<List<DonationHistory>> findByDonation(Donation donation);

}
