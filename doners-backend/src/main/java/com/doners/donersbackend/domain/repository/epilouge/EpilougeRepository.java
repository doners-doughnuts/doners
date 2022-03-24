package com.doners.donersbackend.domain.repository.epilouge;

import com.doners.donersbackend.domain.dao.epilouge.Epilouge;
import com.doners.donersbackend.domain.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EpilougeRepository extends JpaRepository<Epilouge,String> {
    Optional<List<Epilouge>> findByEpilougeIsDeleted(boolean isDeleted);
    Optional<List<Epilouge>> findByUserAndEpilougeIsDeletedOrderByEpilougeCreateTimeDesc(User user, boolean isDeleted);
}
