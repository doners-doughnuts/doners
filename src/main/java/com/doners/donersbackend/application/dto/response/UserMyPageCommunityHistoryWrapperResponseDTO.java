package com.doners.donersbackend.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ApiModel("UserMyPageCommunityHistoryWrapperResponseDTO")
@Getter
@ToString
public class UserMyPageCommunityHistoryWrapperResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "해당 유저가 작성한 커뮤니티 글 목록")
    private List<UserMyPageCommunityHistoryResponseDTO> userMyPageCommunityHistoryResponseDTOList;

    @Builder
    public UserMyPageCommunityHistoryWrapperResponseDTO(List<UserMyPageCommunityHistoryResponseDTO> userMyPageCommunityHistoryResponseDTOList) {
        this.userMyPageCommunityHistoryResponseDTOList = userMyPageCommunityHistoryResponseDTOList;
    }

    public static UserMyPageCommunityHistoryWrapperResponseDTO of(String message, Integer statusCode, UserMyPageCommunityHistoryWrapperResponseDTO userMyPageCommunityHistoryWrapperResponseDTO) {
        UserMyPageCommunityHistoryWrapperResponseDTO res = userMyPageCommunityHistoryWrapperResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
