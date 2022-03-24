package com.doners.donersbackend.application.dto.response.donation;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ApiModel("DonationGetListWrapperResponseDTO")
@Getter
@ToString
public class DonationGetListWrapperResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name = "기부글 목록")
    private List<DonationGetListResponseDTO> donationGetListResponseDTOList;

    @Builder
    public DonationGetListWrapperResponseDTO(List<DonationGetListResponseDTO> donationGetListResponseDTOList) {
        this.donationGetListResponseDTOList = donationGetListResponseDTOList;
    }

    public static DonationGetListWrapperResponseDTO of(String message, Integer statusCode, DonationGetListWrapperResponseDTO donationGetListWrapperResponseDTO) {
        DonationGetListWrapperResponseDTO res = donationGetListWrapperResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }

}
