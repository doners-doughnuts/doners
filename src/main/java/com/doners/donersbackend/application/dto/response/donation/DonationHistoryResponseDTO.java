package com.doners.donersbackend.application.dto.response.donation;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("DonationHistoryResponseDTO")
@Getter
@ToString
public class DonationHistoryResponseDTO {

    @ApiModelProperty(name = "기부자 닉네임")
    private String nickname;

    @ApiModelProperty(name = "기부 금액")
    private double amount;

    @Builder
    public DonationHistoryResponseDTO(String nickname, double amount) {
        this.nickname = nickname;
        this.amount = amount;
    }

}
