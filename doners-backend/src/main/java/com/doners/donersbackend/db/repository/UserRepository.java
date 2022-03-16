package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String id);
    Optional<User> findByUserNickname(String userNickname);
    Optional<User> findByUserEmail(String userEmail);
    Optional<User> findByUserAccount(String userAccount);
}
