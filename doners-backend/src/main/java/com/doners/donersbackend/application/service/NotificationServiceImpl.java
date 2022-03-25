package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.response.donation.NotificationResponseDTO;
import com.doners.donersbackend.domain.dao.User;
import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.donation.Notification;
import com.doners.donersbackend.domain.enums.NotificationCode;
import com.doners.donersbackend.domain.repository.UserRepository;
import com.doners.donersbackend.domain.repository.donation.DonationRepository;
import com.doners.donersbackend.domain.repository.donation.NotificationRepository;
import com.doners.donersbackend.security.util.JwtAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final DonationRepository donationRepository;

    private final UserRepository userRepository;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    @Override
    public NotificationResponseDTO getNotification(String accessToken) {

        String token = accessToken.split(" ")[1];

        String userAccount = jwtAuthenticationProvider.getUserAccount(token);

        User user = userRepository.findByUserAccountAndUserIsDeleted(userAccount, false)
                .orElseThrow(() -> new IllegalArgumentException("유저 정보가 존재하지 않습니다."));

        // 회원의 삭제되지 않은 기부글
        Donation donation = donationRepository.findByUserAndIsDeleted(user, false)
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글을 찾을 수 없습니다."));

        // 종료 시간 지났으면
        if (donation.getEndTime() != null && LocalDateTime.now().isAfter(donation.getEndTime())) return createNotification(donation, "종료", NotificationCode.PROGRESS);

        // 승인되었으면
        if (donation.isApproved()) return createNotification(donation, "승인", NotificationCode.APPROVAL);

        return null;

    }

    public NotificationResponseDTO createNotification(Donation donation, String status, NotificationCode notificationCode) {

        // 읽지 않은 알림 존재 여부 확인
        Notification notification = notificationRepository.findByDonationAndNotificationCodeAndIsRead(donation, notificationCode, false).orElse(null);

        // 기존 알림이 있다면
        if (notification != null) {
            return NotificationResponseDTO.builder()
                    .donationId(donation.getId())
                    .description(notification.getDescription())
                    .createTime(notification.getCreateTime())
                    .build();
        }

        Notification notificationInfo = Notification.builder()
                .description("기부글이 " + status + "되었습니다.")
                .isRead(false)
                .notificationCode(notificationCode)
                .createTime(LocalDateTime.now())
                .donation(donation)
                .build();

        return NotificationResponseDTO.builder()
                .donationId(donation.getId())
                .description(notificationInfo.getDescription())
                .createTime(notificationInfo.getCreateTime())
                .build();

    }

}
