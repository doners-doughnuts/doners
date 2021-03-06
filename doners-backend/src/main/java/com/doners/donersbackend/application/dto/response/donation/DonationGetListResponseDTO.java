package com.doners.donersbackend.application.dto.response.donation;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@ApiModel("DonationGetListResponseDTO")
@Getter
@ToString
public class DonationGetListResponseDTO {

    @ApiModelProperty(name = "기부글 ID")
    private String donationId;

    @ApiModelProperty(name = "썸네일 URL")
    private String thumbnail;

    @ApiModelProperty(name = "제목")
    private String title;

    @ApiModelProperty(name = "이름")
    private String beneficiaryName;

    @ApiModelProperty(name = "닉네임")
    private String userNickname;

    @ApiModelProperty(name = "목표 모금액")
    private double targetAmount;

    @ApiModelProperty(name = "마감일")
    private LocalDate endDate;

    @ApiModelProperty(name = "컨트랙트 주소")
    private String contractAddress;

    @Builder
    public DonationGetListResponseDTO(String donationId, String thumbnail, String title, String beneficiaryName, String userNickname, double targetAmount, LocalDate endDate, String contractAddress) {
        this.donationId = donationId;
        this.thumbnail = thumbnail;
        this.title = title;
        this.beneficiaryName = beneficiaryName;
        this.userNickname = userNickname;
        this.targetAmount = targetAmount;
        this.endDate = endDate;
        this.contractAddress = contractAddress;
    }

}
