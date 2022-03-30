package com.doners.donersbackend.application.dto.response.donation;

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

    @ApiModelProperty(name = "Budget 순서")
    private long sequence;

    @Builder
    public DonationBudgetResponseDTO(String plan, long amount, long sequence) {
        this.plan = plan;
        this.amount = amount;
        this.sequence = sequence;
    }

}
