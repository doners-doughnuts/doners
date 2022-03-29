package com.doners.donersbackend.application.dto.response.donation;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Map;

@ApiModel("DonationGetListResponseDTO")
@Getter
@ToString
public class DonationGetListResponseDTO {

    @ApiModelProperty(name = "기부글 ID")
    private String donationId;

    @ApiModelProperty(name = "썸네일 이미지 주소")
    private String thumbnail;

    @ApiModelProperty(name = "제목")
    private String title;

    @ApiModelProperty(name = "이름")
    private String beneficiaryName;

    @ApiModelProperty(name = "목표 모금액")
    private long targetAmount;

    @Builder
    public DonationGetListResponseDTO(String donationId, String thumbnail, String title, String beneficiaryName, long targetAmount) {
        this.donationId = donationId;
        this.thumbnail = thumbnail;
        this.title = title;
        this.beneficiaryName = beneficiaryName;
        this.targetAmount = targetAmount;
    }

}
