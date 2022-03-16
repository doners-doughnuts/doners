package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community,String> {
}
