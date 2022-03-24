package com.doners.donersbackend.application.dto.request.donation;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@ApiModel("DonationBudgetRequestInfo")
@Getter
@ToString
@NoArgsConstructor
public class DonationBudgetRequestDTO {

    @NotBlank
    @ApiModelProperty(name = "활용 계획")
    private String plan;

    @Positive
    @ApiModelProperty(name = "활용 금액")
    private long amount;

}
