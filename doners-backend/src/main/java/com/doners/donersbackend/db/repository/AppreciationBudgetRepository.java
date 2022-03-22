package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.Appreciation;
import com.doners.donersbackend.db.entity.AppreciationBudget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppreciationBudgetRepository extends JpaRepository<AppreciationBudget,String> {
    Optional<List<AppreciationBudget>> findAllByAppreciation(Appreciation appreciation);
}
