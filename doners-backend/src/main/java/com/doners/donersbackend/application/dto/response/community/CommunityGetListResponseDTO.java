package com.doners.donersbackend.application.dto.response.community;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ApiModel("CommunityGetListResponseDTO")
@Getter
@ToString
public class CommunityGetListResponseDTO {
    @ApiModelProperty(name = "커뮤니티 글 ID")
    private String communityId;


    @ApiModelProperty(name = "커뮤니티 글 제목")
    private String communityTitle;

    @ApiModelProperty(name = "커뮤니티 글 내용")
    private String communityDescription;

    @ApiModelProperty(name = "커뮤니티 글 조회수")
    private LocalDateTime communityCreateTime;

    @ApiModelProperty(name = "커뮤니티 글 조회수")
    private long communityViews;

    @ApiModelProperty(name = "커뮤니티 글 작성자")
    private String communityWriter;

    @Builder
    public CommunityGetListResponseDTO(String communityId, String communityTitle, String communityDescription,
                                       LocalDateTime communityCreateTime, long communityViews,String communityWriter) {
        this.communityId = communityId;
        this.communityTitle = communityTitle;
        this.communityDescription = communityDescription;
        this.communityCreateTime = communityCreateTime;
        this.communityViews = communityViews;
        this.communityWriter = communityWriter;
    }
}
