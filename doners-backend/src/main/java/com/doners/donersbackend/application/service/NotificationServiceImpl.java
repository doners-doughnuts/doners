package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.donation.NotificationReadDTO;
import com.doners.donersbackend.application.dto.response.donation.NotificationResponseDTO;
import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.donation.Notification;
import com.doners.donersbackend.domain.dao.user.User;
import com.doners.donersbackend.domain.enums.ApprovalStatusCode;
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
                .orElseThrow(() -> new IllegalArgumentException("해당 계정을 찾을 수 없습니다."));

        // 회원의 삭제되지 않은 기부글
        Donation donation = donationRepository.findByUserAndIsDeleted(user, false)
                .orElseThrow(() -> new IllegalArgumentException("해당 기부글을 찾을 수 없습니다."));

        // 종료 시간 지났으면
        if (donation.isApproved() && donation.getEndTime() != null && LocalDateTime.now().isAfter(donation.getEndTime())) {
            return createNotification(donation, "종료", NotificationCode.PROGRESS);
        }

        // 승인된 상태라면
        if (donation.getApprovalStatusCode().equals(ApprovalStatusCode.APPROVAL)) {
            return createNotification(donation, "승인", NotificationCode.APPROVAL);
        // 거절된 상태라면
        } else if (donation.getApprovalStatusCode().compareTo(ApprovalStatusCode.APPROVAL) > 0) {
            return createNotification(donation, "거절", NotificationCode.APPROVAL);
        }

        return null;

    }

    @Override
    public void readNotification(String accessToken, NotificationReadDTO notificationReadDTO) {

        String token = accessToken.split(" ")[1];

        String userAccount = jwtAuthenticationProvider.getUserAccount(token);

        User user = userRepository.findByUserAccountAndUserIsDeleted(userAccount, false)
                .orElseThrow(() -> new IllegalArgumentException("해당 계정을 찾을 수 없습니다."));

        Notification notification = notificationRepository.findById(notificationReadDTO.getNotificationId())
                .orElseThrow(() -> new IllegalArgumentException("해당 알림을 찾을 수 없습니다."));

        notification.changeIsRead();

        notificationRepository.save(notification);

    }

    public NotificationResponseDTO createNotification(Donation donation, String status, NotificationCode notificationCode) {

        // 알림 존재 여부 확인
        Notification notification = notificationRepository.findByDonationAndNotificationCode(donation, notificationCode).orElse(null);

        // 기존 알림이 있다면
        if (notification != null) {
            // 알림을 읽었다면
            if (notification.isRead()) return null;

            return NotificationResponseDTO.builder()
                    .notificationId(notification.getId())
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

        notificationRepository.save(notificationInfo);

        return NotificationResponseDTO.builder()
                .notificationId(notificationInfo.getId())
                .donationId(donation.getId())
                .description(notificationInfo.getDescription())
                .createTime(notificationInfo.getCreateTime())
                .build();

    }

}
