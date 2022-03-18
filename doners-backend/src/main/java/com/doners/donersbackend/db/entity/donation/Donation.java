package com.doners.donersbackend.db.entity.donation;

import com.doners.donersbackend.db.entity.BaseEntity;
import com.doners.donersbackend.db.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Donation extends BaseEntity {

    @Column(name = "donation_phone")
    private String phone;

    @Column(name = "donation_is_deputy", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isDeputy;

    @Column(name = "donation_beneficiary_name")
    private String beneficiaryName;

    @Column(name = "donation_beneficiary_phone")
    private String beneficiaryPhone;

    @Column(name = "donation_title")
    private String title;

    @Column(name = "donation_category")
    private String category;

    @Column(name = "donation_description")
    private String description;

    @Column(name = "donation_amount")
    private long amount;

    @Column(name = "donation_start_time")
    private LocalDateTime startTime;

    @Column(name = "donation_end_time")
    private LocalDateTime endTime;

    @Column(name = "donation_is_approved", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isApproved;

    @Column(name = "donation_is_received", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isReceived;

    @Column(name = "donation_views")
    private int views;

    @Column(name = "donation_is_deleted", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
