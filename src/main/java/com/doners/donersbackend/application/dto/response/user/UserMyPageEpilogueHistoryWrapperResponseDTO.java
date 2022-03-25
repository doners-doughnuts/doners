package com.doners.donersbackend.application.dto.response.user;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ApiModel("UserMyPageEpilogueHistoryWrapperResponseDTO")
@Getter
@ToString
public class UserMyPageEpilogueHistoryWrapperResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "해당 유저가 작성한 감사 글 목록")
    private List<UserMyPageEpilogueHistoryResponseDTO> userMyPageEpilogueHistoryResponseDTOList;

    @Builder
    public UserMyPageEpilogueHistoryWrapperResponseDTO(List<UserMyPageEpilogueHistoryResponseDTO> userMyPageEpilogueHistoryResponseDTOList) {
        this.userMyPageEpilogueHistoryResponseDTOList = userMyPageEpilogueHistoryResponseDTOList;
    }

    public static UserMyPageEpilogueHistoryWrapperResponseDTO of(String message, Integer statusCode, UserMyPageEpilogueHistoryWrapperResponseDTO userMyPageEpilogueHistoryWrapperResponseDTO) {
        UserMyPageEpilogueHistoryWrapperResponseDTO res = userMyPageEpilogueHistoryWrapperResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
