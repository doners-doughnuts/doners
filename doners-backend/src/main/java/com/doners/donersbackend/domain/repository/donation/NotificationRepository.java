package com.doners.donersbackend.domain.repository.donation;

import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.donation.Notification;
import com.doners.donersbackend.domain.enums.NotificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {

    // 기부글, 알림 코드, 가장 최근 것
    Optional<Notification> findByDonationAndNotificationCodeAndIsRead(Donation donation, NotificationCode notificationCode, boolean isRead);

}
