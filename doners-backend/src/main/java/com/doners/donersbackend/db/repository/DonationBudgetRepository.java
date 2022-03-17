package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.donation.DonationBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationBudgetRepository extends JpaRepository<DonationBudget, String> {

}
