package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community,String> {
    Optional<List<Community>> findByCommunityIsDeleted(boolean isDeleted);
}
