package com.doners.donersbackend.api.dto.response;

import com.doners.donersbackend.common.model.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ApiModel("UserMyPageEpilougeHistoryWrapperResponseDTO")
@Getter
@ToString
public class UserMyPageEpilougeHistoryWrapperResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "해당 유저가 작성한 감사 글 목록")
    private List<UserMyPageEpilougeHistoryResponseDTO> userMyPageEpilougeHistoryResponseDTOList;

    @Builder
    public UserMyPageEpilougeHistoryWrapperResponseDTO(List<UserMyPageEpilougeHistoryResponseDTO> userMyPageEpilougeHistoryResponseDTOList) {
        this.userMyPageEpilougeHistoryResponseDTOList = userMyPageEpilougeHistoryResponseDTOList;
    }

    public static UserMyPageEpilougeHistoryWrapperResponseDTO of(String message, Integer statusCode, UserMyPageEpilougeHistoryWrapperResponseDTO userMyPageEpilougeHistoryWrapperResponseDTO) {
        UserMyPageEpilougeHistoryWrapperResponseDTO res = userMyPageEpilougeHistoryWrapperResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
