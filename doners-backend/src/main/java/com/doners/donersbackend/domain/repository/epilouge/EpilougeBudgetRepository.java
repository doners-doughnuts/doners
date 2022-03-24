package com.doners.donersbackend.domain.repository.epilouge;

import com.doners.donersbackend.domain.dao.epilouge.Epilouge;
import com.doners.donersbackend.domain.dao.epilouge.EpilougeBudget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EpilougeBudgetRepository extends JpaRepository<EpilougeBudget,String> {
    Optional<List<EpilougeBudget>> findAllByEpilouge(Epilouge epilouge);
}
