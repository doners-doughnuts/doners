package com.doners.donersbackend.domain.repository;

import com.doners.donersbackend.domain.dao.community.Community;
import com.doners.donersbackend.domain.dao.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community,String> {
    Optional<List<Community>> findByCommunityIsDeleted(boolean isDeleted);
    Optional<List<Community>> findByCommunityIsDeletedOrderByCommunityCodeAscCommunityCreateTimeDesc(boolean isDeleted, Pageable pageable);
    Optional<List<Community>> findByUserAndCommunityIsDeletedOrderByCommunityCreateTimeDesc(User user, boolean isDeleted);
}
