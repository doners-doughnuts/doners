package com.doners.donersbackend.api.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("EpilougeBudgetResponseDTO")
@Getter
@ToString
public class EpilougeBudgetResponseDTO {

    @ApiModelProperty(name = "활용 계획")
    private String epilougeBudgetPlan;

    @ApiModelProperty(name = "활용 금액")
    private long epilougeBudgetAmount;

    @Builder
    public EpilougeBudgetResponseDTO(String epilougeBudgetPlan, long epilougeBudgetAmount) {
        this.epilougeBudgetPlan = epilougeBudgetPlan;
        this.epilougeBudgetAmount = epilougeBudgetAmount;
    }
}
