package com.doners.donersbackend.application.dto.request.epilogue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ApiModel("EpilogueBudgetRequestDTO")
@Getter
@ToString
@NoArgsConstructor
public class EpilogueBudgetRequestDTO {

    @ApiModelProperty(name = "활용 계획")
    private String epilogueBudgetPlan;

    @ApiModelProperty(name = "활용 금액")
    private long epilogueBudgetAmount;
}
