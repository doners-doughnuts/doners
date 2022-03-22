package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel("DonationApproveRequestDTO")
@Getter
@ToString
@NoArgsConstructor
public class DonationApproveRequestDTO {

    @NotBlank
    @ApiModelProperty(name = "기부글 ID")
    private String donationId;

    @NotNull
    @ApiModelProperty(name = "승인 여부")
    private boolean approved;

}

