package com.doners.donersbackend.api.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;

public interface EmailConfirmationService {

    // 이메일 인증을 위해 이메일 생성
    void createEmailConfirmation(String userEmail) throws Exception;

    // 이메일 인증
    Integer confirmEmailAddress(String emailAddress);

    // 인증 완료된 이메일인지 확인
    boolean isConfirmedEmail(String emailAddress);

    @Async
    void sendEmail(SimpleMailMessage email) throws Exception;
}
