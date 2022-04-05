package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.donation.NotificationReadPatchDTO;
import com.doners.donersbackend.application.dto.response.donation.NotificationGetListWrapperResponseDTO;

public interface NotificationService {

    NotificationGetListWrapperResponseDTO getNotification(String accessToken);

    void readNotification(String accessToken, NotificationReadPatchDTO notificationReadPatchDTO);

}
