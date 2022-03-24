package com.doners.donersbackend.domain.repository;

import com.doners.donersbackend.domain.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String id);
    Optional<User> findByUserNickname(String userNickname);
    Optional<User> findByUserEmail(String userEmail);
    Optional<User> findByUserEmailAndUserIsDeleted(String userEmail, boolean userIsDeleted);
    Optional<User> findByUserAccount(String userAccount);
    Optional<User> findByUserAccountAndUserIsDeleted(String userAccount, boolean userIsDeleted);
}
