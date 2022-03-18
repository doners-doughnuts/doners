package com.doners.donersbackend.api.service;

import com.doners.donersbackend.db.entity.EmailConfirmation;
import com.doners.donersbackend.db.entity.User;
import com.doners.donersbackend.db.repository.EmailConfirmationRepository;
import com.doners.donersbackend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailConfirmationServiceImpl implements EmailConfirmationService {

    private final JavaMailSender javaMailSender;

    private final UserRepository userRepository;

    private final EmailConfirmationRepository emailConfirmationRepository;

    private static final long EMAIL_TOKEN_EXPIRATION_TIME = 5L; // 만료 기간 5분

    // 이메일 인증을 위해 이메일 생성 메서드
    @Override
    public void createEmailConfirmation(String emailAddress) {
        try {
            EmailConfirmation emailConfirmation = EmailConfirmation.builder()
                    .emailAddress(emailAddress)
                    .emailConfirmationCreateTime(LocalDateTime.now())
                    .emailConfirmationDurationTime(LocalDateTime.now().plusMinutes(EMAIL_TOKEN_EXPIRATION_TIME))
                    .build();

            emailConfirmationRepository.save(emailConfirmation);

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(emailAddress);
            mailMessage.setFrom("Doners");
            mailMessage.setSubject("Doners 이메일 인증");
//            mailMessage.setText("인증 번호: " + emailConfirmation.getId());
            mailMessage.setText(new StringBuffer()
                            .append("\n\n 아래 링크를 클릭하시면 이메일 인증이 완료됩니다.\n")
                            .append("http://localhost:8080/api/email/")
                            .append(emailAddress).toString());

            sendEmail(mailMessage);
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

    @Override
    public boolean isValidId(String emailConfirmationId) throws Exception {
        EmailConfirmation emailConfirmation = emailConfirmationRepository.findByIdAndEmailConfirmationIsExpired(emailConfirmationId, false)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일 정보를 찾을 수 없습니다."));

        if(LocalDateTime.now().isAfter(emailConfirmation.getEmailConfirmationDurationTime())) {
            emailConfirmation.changeIsExpired(true);
            emailConfirmationRepository.save(emailConfirmation);

            return false;
        }

        return true;
    }

    @Override
    public boolean isValidEmail(String emailConfirmationId) throws Exception {
        // 추후 변경
        User user = userRepository.findByUserNickname("웅이")
                .orElseThrow(() -> new IllegalArgumentException("해당 닉네임을 찾을 수 없습니다."));

        EmailConfirmation emailConfirmation = emailConfirmationRepository.findById(emailConfirmationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일 정보를 찾을 수 없습니다."));

        return emailConfirmation.getUser().getId() == user.getId();
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
