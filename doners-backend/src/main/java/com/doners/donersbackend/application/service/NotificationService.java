package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.donation.NotificationReadPatchDTO;
import com.doners.donersbackend.application.dto.response.donation.NotificationResponseDTO;

public interface NotificationService {

    NotificationResponseDTO getNotification(String accessToken);

    void readNotification(String accessToken, NotificationReadPatchDTO notificationReadPatchDTO);

}
