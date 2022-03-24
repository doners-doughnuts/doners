package com.doners.donersbackend.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ApiModel("DonationGetListWrapperResponseDTO")
@Getter
@ToString
public class CommunityGetListWrapperResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "커뮤니티 글 목록")
    private List<CommunityGetListResponseDTO> communityGetListResponseDTOList;

    @Builder
    public CommunityGetListWrapperResponseDTO(List<CommunityGetListResponseDTO> communityGetListResponseDTOList) {
        this.communityGetListResponseDTOList = communityGetListResponseDTOList;
    }

    public static CommunityGetListWrapperResponseDTO of(String message, Integer statusCode, CommunityGetListWrapperResponseDTO communityGetListWrapperResponseDTOList) {
        CommunityGetListWrapperResponseDTO res = communityGetListWrapperResponseDTOList;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
