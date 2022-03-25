package com.doners.donersbackend.domain.repository.epilogue;

import com.doners.donersbackend.domain.dao.epilogue.Epilogue;
import com.doners.donersbackend.domain.dao.epilogue.EpilogueBudget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EpilogueBudgetRepository extends JpaRepository<EpilogueBudget,String> {
    Optional<List<EpilogueBudget>> findAllByEpilogue(Epilogue epilogue);
}
