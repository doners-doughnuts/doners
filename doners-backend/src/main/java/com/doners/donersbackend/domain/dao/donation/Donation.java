package com.doners.donersbackend.domain.dao.donation;

import com.doners.donersbackend.domain.dao.BaseEntity;
import com.doners.donersbackend.domain.dao.user.User;
import com.doners.donersbackend.domain.enums.ApprovalStatusCode;
import com.doners.donersbackend.domain.enums.CategoryCode;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Donation extends BaseEntity {

    @Column(name = "donation_contract_address")
    private String contractAddress;

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
    @Lob
    private String description;

    @Column(name = "donation_account")
    private String account;

    @Column(name = "donation_amount")
    private double amount;

    @Column(name = "donation_start_date")
    private LocalDate startDate;

    @Column(name = "donation_end_date")
    private LocalDate endDate;

    @Column(name = "donation_is_approved", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isApproved;

    @Column(name = "donation_approval_status_code")
    private ApprovalStatusCode approvalStatusCode;

    @Column(name = "donation_is_received", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isReceived;

    @Column(name = "donation_views")
    private long views;

    @Column(name = "donation_recommendations")
    private long recommendations;

    @Column(name = "donation_is_deleted", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 수혜자 정보
    public void changeBeneficiary(String beneficiaryName, String beneficiaryPhone) {
        this.beneficiaryName = beneficiaryName;
        this.beneficiaryPhone = beneficiaryPhone;
    }

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
    public void changeStartDate() {
        this.startDate = LocalDate.now();
    }

    // 컨트랙트 주소
    public void changeContractAddress(String contractAddress) {
        this.contractAddress = contractAddress;
    }

    // 거절 사유
    public void changeApprovalStatusCode(ApprovalStatusCode approvalStatusCode) {
        this.approvalStatusCode = approvalStatusCode;
    }

    // 삭제
    public void changeIsDeleted() {
        this.isDeleted = true;
    }

}
