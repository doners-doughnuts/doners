package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.donation.Donation;
import com.doners.donersbackend.db.entity.donation.DonationBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationBudgetRepository extends JpaRepository<DonationBudget, String> {

    Optional<List<DonationBudget>> findByDonation(Donation donation);

}
