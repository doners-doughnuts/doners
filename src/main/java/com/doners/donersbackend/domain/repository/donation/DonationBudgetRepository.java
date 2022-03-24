package com.doners.donersbackend.domain.repository.donation;

import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.donation.DonationBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationBudgetRepository extends JpaRepository<DonationBudget, String> {

    Optional<List<DonationBudget>> findByDonation(Donation donation);

}
