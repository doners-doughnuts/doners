package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ApiModel("AppreciationBudgetRequestDTO")
@Getter
@ToString
@NoArgsConstructor
public class AppreciationBudgetRequestDTO {

    @ApiModelProperty(name = "활용 계획")
    private String appreciationBudgetPlan;

    @ApiModelProperty(name = "활용 금액")
    private long appreciationBudgetAmount;
}
