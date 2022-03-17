package com.doners.donersbackend.api.dto.response;

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

    @ApiModelProperty(name = "대표 사진")
    private Map<String, String> image;

    @ApiModelProperty(name = "제목")
    private String title;

    @ApiModelProperty(name = "이름")
    private String beneficiaryName;

    @ApiModelProperty(name = "목표 모금액")
    private long targetAmount;

    @Builder
    public DonationGetListResponseDTO(String donationId, Map<String, String> image, String title, String beneficiaryName, long targetAmount) {
        this.donationId = donationId;
        this.image = image;
        this.title = title;
        this.beneficiaryName = beneficiaryName;
        this.targetAmount = targetAmount;
    }

}
