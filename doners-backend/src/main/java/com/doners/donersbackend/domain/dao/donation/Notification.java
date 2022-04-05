package com.doners.donersbackend.domain.dao.donation;

import com.doners.donersbackend.domain.dao.BaseEntity;
import com.doners.donersbackend.domain.enums.NotificationCode;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Notification extends BaseEntity {

    @Column(name = "notification_description")
    private String description;

    @Column(name = "notification_is_read", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isRead;

    @Column(name = "notification_code")
    private NotificationCode notificationCode;

    @Column(name = "notification_create_time")
    private String createTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id")
    private Donation donation;

    @PrePersist
    private void onPrePersist() {
        this.createTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public void changeIsRead() {
        this.isRead = true;
    }

}
