package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.email.EmailConfirmationCreateRequestDTO;
import com.doners.donersbackend.domain.dao.email.EmailConfirmation;
import com.doners.donersbackend.domain.repository.EmailConfirmationRepository;
import com.doners.donersbackend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailConfirmationServiceImpl implements EmailConfirmationService {

    @Value("${doners.email.confirmation.server.domain}")
    private String domain;

    @Value("${server.port}")
    private String port;

    private final JavaMailSender javaMailSender;

    private final UserRepository userRepository;

    private final EmailConfirmationRepository emailConfirmationRepository;

    // 이메일 인증을 위해 이메일 생성 메서드
    @Transactional
    @Override
    public void createEmailConfirmation(EmailConfirmationCreateRequestDTO emailConfirmationCreateRequestDTO) throws Exception {
        String emailAddress = emailConfirmationCreateRequestDTO.getEmailAddress();

        if(userRepository.findByUserEmailAndUserIsDeleted(emailAddress, false).isPresent() ||
        emailConfirmationRepository.findByEmailAddressAndEmailConfirmationIsConfirmed(emailAddress, true).isPresent()) {
            throw new Exception("이미 해당 이메일로 가입 되어 있는 계정이 있습니다.");
        }

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(emailAddress);
            mailMessage.setFrom("Doners");
            mailMessage.setSubject("Doners 이메일 인증");
//            mailMessage.setText("인증 번호: " + emailConfirmation.getId());
            mailMessage.setText(new StringBuffer()
                            .append("\n\n 아래 링크를 클릭하시면 이메일 인증이 완료됩니다.\n")
                            .append("https://" + domain + ":" + port + "/api/email/")
                            .append(emailAddress).toString());

            sendEmail(mailMessage);

            if(!emailConfirmationRepository.findByEmailAddress(emailAddress).isPresent()) {
                EmailConfirmation emailConfirmation = EmailConfirmation.builder()
                        .emailAddress(emailAddress)
                        .emailConfirmationCreateTime(LocalDateTime.now())
                        .build();

                emailConfirmationRepository.save(emailConfirmation);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "인증 메일 전송이 실패했습니다.");
        }
    }

    @Override
    public Integer confirmEmailAddress(String emailAddress) {
        EmailConfirmation emailConfirmation = emailConfirmationRepository.findByEmailAddressAndEmailConfirmationIsConfirmed(emailAddress, false)
                .orElseThrow(() -> new IllegalArgumentException("인증을 기다리는 이메일 정보가 없습니다."));

        try {
            emailConfirmation.changeIsConfirmed(true);

            emailConfirmationRepository.save(emailConfirmation);
        } catch (Exception e) {
            return 409;
        }

        return 200;
    }

    // 인증 완료된 이메일인지 확인
    @Override
    public boolean isConfirmedEmail(String emailAddress) {
        EmailConfirmation emailConfirmation = emailConfirmationRepository.findByEmailAddress(emailAddress)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일 정보를 찾을 수 없습니다."));

        return emailConfirmation.isEmailConfirmationIsConfirmed();
    }

    @Override
    @Async
    public void sendEmail(SimpleMailMessage email) throws Exception {
        javaMailSender.send(email);
    }

}
