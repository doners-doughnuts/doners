package com.doners.donersbackend.api.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("DonationBudgetResponseDTO")
@Getter
@ToString
public class DonationBudgetResponseDTO {

    @ApiModelProperty(name = "활용 계획")
    private String plan;

    @ApiModelProperty(name = "활용 금액")
    private long amount;

    @Builder
    public DonationBudgetResponseDTO(String plan, long amount) {
        this.plan = plan;
        this.amount = amount;
    }

}
