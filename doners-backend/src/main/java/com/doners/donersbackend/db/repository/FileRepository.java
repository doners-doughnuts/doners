package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.donation.Donation;
import com.doners.donersbackend.db.entity.donation.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, String> {

    Optional<List<File>> findByDonation(Donation donation);

}
