package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.Epilouge;
import com.doners.donersbackend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EpilougeRepository extends JpaRepository<Epilouge,String> {
    Optional<List<Epilouge>> findByEpilougeIsDeleted(boolean isDeleted);
    Optional<List<Epilouge>> findByUserAndEpilougeIsDeletedOrderByEpilougeCreateTimeDesc(User user, boolean isDeleted);
}
