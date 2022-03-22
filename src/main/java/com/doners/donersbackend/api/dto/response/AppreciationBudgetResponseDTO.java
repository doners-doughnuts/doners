package com.doners.donersbackend.api.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("AppreciationBudgetResponseDTO")
@Getter
@ToString
public class AppreciationBudgetResponseDTO {

    @ApiModelProperty(name = "활용 계획")
    private String appreciationBudgetPlan;

    @ApiModelProperty(name = "활용 금액")
    private long appreciationBudgetAmount;

    @Builder
    public AppreciationBudgetResponseDTO(String appreciationBudgetPlan, long appreciationBudgetAmount) {
        this.appreciationBudgetPlan = appreciationBudgetPlan;
        this.appreciationBudgetAmount = appreciationBudgetAmount;
    }
}
