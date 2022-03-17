package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.donation.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, String> {
}
