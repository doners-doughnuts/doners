package com.doners.donersbackend.application.dto.response.user;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ApiModel("UserMyPageDonationHistoryWrapperResponseDTO")
@Getter
@ToString
public class UserMyPageDonationHistoryWrapperResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "해당 유저가 신청한 기부 목록")
    private List<UserMyPageDonationHistoryResponseDTO> userMyPageDonationHistoryResponseDTOList;

    @Builder
    public UserMyPageDonationHistoryWrapperResponseDTO(List<UserMyPageDonationHistoryResponseDTO> userMyPageDonationHistoryResponseDTOList) {
        this.userMyPageDonationHistoryResponseDTOList = userMyPageDonationHistoryResponseDTOList;
    }

    public static UserMyPageDonationHistoryWrapperResponseDTO of(String message, Integer statusCode, UserMyPageDonationHistoryWrapperResponseDTO userMyPageDonationHistoryWrapperResponseDTO) {
        UserMyPageDonationHistoryWrapperResponseDTO res = userMyPageDonationHistoryWrapperResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
