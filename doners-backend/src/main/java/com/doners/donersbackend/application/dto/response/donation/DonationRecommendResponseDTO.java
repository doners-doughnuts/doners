package com.doners.donersbackend.application.dto.response.donation;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("DonationRecommendResponseDTO")
@Getter
@ToString
public class DonationRecommendResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name = "추천수")
    private long recommendations;

    @Builder
    public DonationRecommendResponseDTO(long recommendations) {
        this.recommendations = recommendations;
    }

    public static DonationRecommendResponseDTO of(String message, Integer statusCode, DonationRecommendResponseDTO donationRecommendResponseDTO) {
        DonationRecommendResponseDTO res = donationRecommendResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }

}
