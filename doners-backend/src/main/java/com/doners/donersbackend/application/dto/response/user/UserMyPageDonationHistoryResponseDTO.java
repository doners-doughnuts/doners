package com.doners.donersbackend.application.dto.response.user;

import com.doners.donersbackend.domain.enums.ApprovalStatusCode;
import com.doners.donersbackend.domain.enums.CategoryCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@ApiModel("UserMyPageDonationHistoryResponseDTO")
@Getter
@ToString
@Builder
public class UserMyPageDonationHistoryResponseDTO {
    @ApiModelProperty(name = "기부 신청 글 ID")
    private String donationId;

    @ApiModelProperty(name = "기부 신청 글 제목")
    private String donationTitle;

    @ApiModelProperty(name = "기부 신청 승인 코드")
    private ApprovalStatusCode donationApprovalStatusCode;

    @ApiModelProperty(name = "기부 신청 승인 여부")
    private boolean donationIsApproved;

    @ApiModelProperty(name = "기부 신청 카테고리 코드")
    private CategoryCode donationCategoryCode;

    @ApiModelProperty(name = "기부 시작일")
    private LocalDate donationStartDate;

    @ApiModelProperty(name = "기부금 수령 완료 여부")
    private boolean donationIsReceived;

    @Builder
    public UserMyPageDonationHistoryResponseDTO(String donationId, String donationTitle, ApprovalStatusCode donationApprovalStatusCode,
                                                boolean donationIsApproved, CategoryCode donationCategoryCode, LocalDate donationStartDate, boolean donationIsReceived) {
        this.donationId = donationId;
        this.donationTitle = donationTitle;
        this.donationApprovalStatusCode = donationApprovalStatusCode;
        this.donationIsApproved = donationIsApproved;
        this.donationCategoryCode = donationCategoryCode;
        this.donationStartDate = donationStartDate;
        this.donationIsReceived = donationIsReceived;
    }
}
