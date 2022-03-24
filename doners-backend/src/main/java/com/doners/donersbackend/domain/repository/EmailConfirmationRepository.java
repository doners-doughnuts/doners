package com.doners.donersbackend.domain.repository;

import com.doners.donersbackend.domain.dao.EmailConfirmation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailConfirmationRepository extends JpaRepository<EmailConfirmation, String> {

    Optional<EmailConfirmation> findByEmailAddressAndEmailConfirmationIsConfirmed(String emailAddress, boolean isConfirmed);
    Optional<EmailConfirmation> findByEmailAddress(String emailAddress);
}
