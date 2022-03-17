package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.Appreciation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppreciationRepository extends JpaRepository<Appreciation,String> {
    Optional<List<Appreciation>> findByAppreciationIsDeleted(boolean isDeleted);
}
