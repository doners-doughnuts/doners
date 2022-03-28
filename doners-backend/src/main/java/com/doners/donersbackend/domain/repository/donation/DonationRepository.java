package com.doners.donersbackend.domain.repository.donation;

import com.doners.donersbackend.domain.dao.user.User;
import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.enums.CategoryCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, String> {

    Optional<List<Donation>> findByCategoryCodeAndIsDeleted(CategoryCode categoryCode, boolean delete);

    boolean existsByIdAndIsDeleted(String donationId, boolean delete);

    Optional<List<Donation>> findByTitleContainingOrDescriptionContaining(String title, String description);

    Optional<List<Donation>> findByTitleContaining(String title);

    Optional<List<Donation>> findByDescriptionContaining(String description);

    Optional<List<Donation>> findByUser(User user);

    Optional<Donation> findByUserAndIsDeleted(User user, boolean delete);

}
