package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.Appreciation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppreciationRepository extends JpaRepository<Appreciation,String> {
}
