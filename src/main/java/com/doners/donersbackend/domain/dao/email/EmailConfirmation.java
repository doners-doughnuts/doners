package com.doners.donersbackend.domain.dao.email;

import com.doners.donersbackend.domain.dao.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmailConfirmation extends BaseEntity {
    @Column(name="email_address")
    private String emailAddress;

    @Column(name="email_confirmation_create_time")
    private LocalDateTime emailConfirmationCreateTime;

    @Column(name="email_confirmation_is_confirmed", columnDefinition="BOOLEAN DEFAULT false" )
    private boolean emailConfirmationIsConfirmed;

    // 승인 여부 변경
    public void changeIsConfirmed(boolean isConfirmed) {
        this.emailConfirmationIsConfirmed = isConfirmed;
    }

}
