package com.doners.donersbackend.api.dto.response.donation;

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
    private long amount;

    @Builder
    public DonationHistoryResponseDTO(String nickname, long amount) {
        this.nickname = nickname;
        this.amount = amount;
    }

}
