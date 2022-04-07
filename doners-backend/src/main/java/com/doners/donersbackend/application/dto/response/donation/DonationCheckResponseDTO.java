package com.doners.donersbackend.application.dto.response.donation;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("DonationCheckResponseDTO")
@Getter
@ToString
public class DonationCheckResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name = "기록 존재 여부")
    private boolean check;

    @Builder
    public DonationCheckResponseDTO(boolean check) {
        this.check = check;
    }

    public static DonationCheckResponseDTO of(String message, Integer statusCode, DonationCheckResponseDTO donationCheckResponseDTO) {
        DonationCheckResponseDTO res = donationCheckResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }

}
