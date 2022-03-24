package com.doners.donersbackend.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ApiModel("UserMyPageCommunityHistoryResponseDTO")
@Getter
@ToString
@Builder
public class UserMyPageCommunityHistoryResponseDTO {

    @ApiModelProperty(name = "커뮤니티 글 ID")
    private String communityId;

    @ApiModelProperty(name = "커뮤니티 글 제목")
    private String communityTitle;

    @ApiModelProperty(name = "커뮤니티 글 작성 시간")
    private LocalDateTime communityCreateTime;

    @Builder
    public UserMyPageCommunityHistoryResponseDTO(String communityId, String communityTitle, LocalDateTime communityCreateTime) {
        this.communityId = communityId;
        this.communityTitle = communityTitle;
        this.communityCreateTime = communityCreateTime;
    }
}
