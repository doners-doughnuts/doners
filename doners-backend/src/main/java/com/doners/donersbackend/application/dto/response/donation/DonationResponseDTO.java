package com.doners.donersbackend.application.dto.response.donation;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import com.doners.donersbackend.domain.enums.ApprovalStatusCode;
import com.doners.donersbackend.domain.enums.CategoryCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@ApiModel("DonationResponseDTO")
@Getter
@ToString
public class DonationResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name = "제목")
    private String title;

    @ApiModelProperty(name = "카테고리 코드")
    private CategoryCode categoryCode;

    @ApiModelProperty(name = "조회수")
    private long views;

    @ApiModelProperty(name = "추천수")
    private long recommendations;

    @ApiModelProperty(name = "사연")
    private String description;

    @ApiModelProperty(name = "대표 사진 주소")
    private String image;

    @ApiModelProperty(name = "신청일")
    private LocalDate startDate;

    @ApiModelProperty(name = "마감일")
    private LocalDate endDate;

    @ApiModelProperty(name = "목표 모금액")
    private double targetAmount;

    @ApiModelProperty(name = "모금액 활용 계획")
    private List<DonationBudgetResponseDTO> budget;

    @ApiModelProperty(name = "신청자 이름")
    private String name;

    @ApiModelProperty(name = "신청자 닉네임")
    private String nickname;

    @ApiModelProperty(name = "신청자 이메일")
    private String email;

    @ApiModelProperty(name = "신청자 전화번호")
    private String phone;

    @ApiModelProperty(name = "대리인 여부")
    private boolean deputy;

    @ApiModelProperty(name = "수혜자 이름")
    private String beneficiaryName;

    @ApiModelProperty(name = "기존 기부 신청 여부")
    private boolean exist;

    @ApiModelProperty(name = "승인 상태 코드")
    private ApprovalStatusCode approvalStatusCode;

    @ApiModelProperty(name = "기부자 명단")
    private List<DonationHistoryResponseDTO> donors;

    @ApiModelProperty(name = "기부액 달성률")
    private double achievementRate;

    @ApiModelProperty(name = "증빙 자료")
    private Map<String, String> evidence;

    @Builder
    public DonationResponseDTO(String title, CategoryCode categoryCode, long views, long recommendations, String description, String image, LocalDate startDate, LocalDate endDate, double targetAmount, List<DonationBudgetResponseDTO> budget, String name, String nickname, String email, String phone, boolean deputy, String beneficiaryName, boolean exist, ApprovalStatusCode approvalStatusCode, List<DonationHistoryResponseDTO> donors, double achievementRate, Map<String, String> evidence) {
        this.title = title;
        this.categoryCode = categoryCode;
        this.views = views;
        this.recommendations = recommendations;
        this.description = description;
        this.image = image;
        this.startDate = startDate;
        this.endDate = endDate;
        this.targetAmount = targetAmount;
        this.budget = budget;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.phone = phone;
        this.deputy = deputy;
        this.beneficiaryName = beneficiaryName;
        this.exist = exist;
        this.approvalStatusCode = approvalStatusCode;
        this.donors = donors;
        this.achievementRate = achievementRate;
        this.evidence = evidence;
    }

    public static DonationResponseDTO of(String message, Integer statusCode, DonationResponseDTO donationResponseDTO) {
        DonationResponseDTO res = donationResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }

    public void changeBeneficiaryName(String beneficiaryName) {
        this.beneficiaryName = beneficiaryName;
    }

}
