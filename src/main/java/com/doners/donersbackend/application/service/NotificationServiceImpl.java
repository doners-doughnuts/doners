package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.donation.NotificationReadPatchDTO;
import com.doners.donersbackend.application.dto.response.donation.NotificationGetListResponseDTO;
import com.doners.donersbackend.application.dto.response.donation.NotificationGetListWrapperResponseDTO;
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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final DonationRepository donationRepository;

    private final UserRepository userRepository;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    @Override
    public NotificationGetListWrapperResponseDTO getNotification(String accessToken) {

        String token = accessToken.split(" ")[1];

        String userAccount = jwtAuthenticationProvider.getUserAccount(token);

        User user = userRepository.findByUserAccountAndUserIsDeleted(userAccount, false)
                .orElseThrow(() -> new IllegalArgumentException("해당 계정을 찾을 수 없습니다."));

        // 회원의 기부글 리스트 최신순
        List<Donation> donationList = donationRepository.findByUserOrderByEndDateDesc(user)
                .orElseThrow(() -> new IllegalArgumentException("기부글 목록을 찾을 수 없습니다."));

        List<NotificationGetListResponseDTO> notificationGetListResponseDTOList = new ArrayList<>();

        donationList.forEach(donation -> {
            // 마감 시간 지났으면
            if (donation.isApproved() && donation.getEndDate() != null && LocalDate.now().isAfter(donation.getEndDate())) {
                notificationGetListResponseDTOList.add(createNotification(donation, "기부글이 마감되었습니다.", NotificationCode.PROGRESS));
            }

            // 승인된 상태라면
            if (donation.getApprovalStatusCode().equals(ApprovalStatusCode.APPROVAL)) {
                notificationGetListResponseDTOList.add(createNotification(donation, "기부글 신청이 승인되었습니다.", NotificationCode.APPROVAL));
            // 거절된 상태라면
            } else if (donation.getApprovalStatusCode().compareTo(ApprovalStatusCode.APPROVAL) > 0) {
                notificationGetListResponseDTOList.add(createNotification(donation, "기부글 신청이 반려되었습니다.", NotificationCode.APPROVAL));
            }
        });

        return NotificationGetListWrapperResponseDTO.builder()
                .notificationGetListResponseDTOList(notificationGetListResponseDTOList)
                .build();

    }

    @Override
    public void readNotification(String accessToken, NotificationReadPatchDTO notificationReadPatchDTO) {

        String token = accessToken.split(" ")[1];

        String userAccount = jwtAuthenticationProvider.getUserAccount(token);

        User user = userRepository.findByUserAccountAndUserIsDeleted(userAccount, false)
                .orElseThrow(() -> new IllegalArgumentException("해당 계정을 찾을 수 없습니다."));

        Notification notification = notificationRepository.findById(notificationReadPatchDTO.getNotificationId())
                .orElseThrow(() -> new IllegalArgumentException("해당 알림을 찾을 수 없습니다."));

        notification.changeIsRead();

        notificationRepository.save(notification);

    }

    public NotificationGetListResponseDTO createNotification(Donation donation, String description, NotificationCode notificationCode) {

        // 알림 존재 여부 확인
        Notification notification = notificationRepository.findByDonationAndNotificationCode(donation, notificationCode).orElse(null);

        // 기존 알림이 없다면
        if (notification == null) {
            notification = Notification.builder()
                    .description(description)
                    .isRead(false)
                    .notificationCode(notificationCode)
                    .donation(donation)
                    .build();

            notificationRepository.save(notification);
        }

        return NotificationGetListResponseDTO.builder()
                .notificationId(notification.getId())
                .donationId(donation.getId())
                .description(notification.getDescription())
                .createTime(notification.getCreateTime())
                .read(notification.isRead())
                .build();

    }

}
