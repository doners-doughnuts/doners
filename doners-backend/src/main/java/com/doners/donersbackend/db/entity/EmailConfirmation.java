package com.doners.donersbackend.db.entity;

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

    @Column(name="email_confirmation_duration_time")
    private LocalDateTime emailConfirmationDurationTime;

    @Column(name="email_confirmation_is_expired", columnDefinition="BOOLEAN DEFAULT false" )
    private boolean emailConfirmationIsExpired;

    @Column(name="email_confirmation_is_confirmed", columnDefinition="BOOLEAN DEFAULT false" )
    private boolean emailConfirmationIsConfirmed;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    // 만료 여부 변경
    public void changeIsExpired(boolean isExpired) {
        this.emailConfirmationIsExpired = isExpired;
    }

    // 승인 여부 변경
    public void changeIsConfirmed(boolean isConfirmed) {
        this.emailConfirmationIsConfirmed = isConfirmed;
    }

}
