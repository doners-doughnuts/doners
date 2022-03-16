package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ApiModel("DonationBudgetInfo")
@Getter
@ToString
@NoArgsConstructor
public class DonationBudgetDTO {

    @ApiModelProperty(name = "활용 계획")
    private String plan;

    @ApiModelProperty(name = "활용 금액")
    private long amount;

}
