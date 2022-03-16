package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@ApiModel("DonationInfoDTO")
@Getter
@ToString
@NoArgsConstructor
public class DonationInfoDTO {

    @ApiModelProperty(name = "회원 ID")
    private String userId;

    @ApiModelProperty(name = "본인 / 대리인 전화번호")
    private String phone;

    @ApiModelProperty(name = "대리인 여부")
    private boolean isDeputy;

    @ApiModelProperty(name = "대상자 이름")
    private String beneficiaryName;

    @ApiModelProperty(name = "대상자 전화번호")
    private String beneficiaryPhone;

    @ApiModelProperty(name = "제목")
    private String title;

    @ApiModelProperty(name = "카테고리")
    private String category;

    @ApiModelProperty(name = "마감일")
    private LocalDateTime endTime;

    @ApiModelProperty(name = "사연")
    private String description;

    @ApiModelProperty(name = "모금액 활용 계획")
    private List<DonationBudgetDTO> plans;

    @ApiModelProperty(name = "목표 모금액")
    private long targetAmount;

}

