package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.donation.NotificationReadDTO;
import com.doners.donersbackend.application.dto.response.donation.NotificationResponseDTO;

public interface NotificationService {

    NotificationResponseDTO getNotification(String accessToken);

    void readNotification(String accessToken, NotificationReadDTO notificationReadDTO);

}
