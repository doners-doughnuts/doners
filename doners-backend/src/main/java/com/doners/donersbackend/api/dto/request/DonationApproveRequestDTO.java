package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ApiModel("DonationApproveRequestDTO")
@Getter
@ToString
@NoArgsConstructor
public class DonationApproveRequestDTO {

    @ApiModelProperty(name = "기부글 ID")
    private String donationId;

    @ApiModelProperty(name = "승인 여부")
    private boolean approve;

}

