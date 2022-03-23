package com.doners.donersbackend.db.entity.donation;

import com.doners.donersbackend.db.entity.BaseEntity;
import com.doners.donersbackend.db.entity.User;
import com.doners.donersbackend.db.enums.CategoryCode;
import com.doners.donersbackend.db.enums.ApprovalStatusCode;
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

    @Column(name = "donation_category_code")
    private CategoryCode categoryCode;

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

    @Column(name = "donation_approval_status_code")
    private ApprovalStatusCode approvalStatusCode;

    @Column(name = "donation_is_received", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isReceived;

    @Column(name = "donation_views")
    private int views;

    @Column(name = "donation_recommendations")
    private int recommendations;

    @Column(name = "donation_is_deleted", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    // 조회
    public void changeViews() {
        this.views += 1;
    }

    // 추천
    public void changeRecommendations() {
        this.recommendations += 1;
    }

    // 승인
    public void changeIsApproved() {
        this.isApproved = true;
    }

    // 시작
    public void changeStartTime() {
        this.startTime = LocalDateTime.now();
    }

    // 거절 사유
    public void changeApprovalStatusCode(ApprovalStatusCode approvalStatusCode) {
        this.approvalStatusCode = approvalStatusCode;
    }

}
