package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.response.donation.NotificationResponseDTO;

public interface NotificationService {

    NotificationResponseDTO getNotification(String accessToken, int index);

}
