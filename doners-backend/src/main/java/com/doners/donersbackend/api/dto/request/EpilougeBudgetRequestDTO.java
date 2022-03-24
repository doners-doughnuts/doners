package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ApiModel("EpilougeBudgetRequestDTO")
@Getter
@ToString
@NoArgsConstructor
public class EpilougeBudgetRequestDTO {

    @ApiModelProperty(name = "활용 계획")
    private String epilougeBudgetPlan;

    @ApiModelProperty(name = "활용 금액")
    private long epilougeBudgetAmount;
}
