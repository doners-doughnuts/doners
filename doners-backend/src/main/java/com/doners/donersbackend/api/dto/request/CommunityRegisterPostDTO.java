package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("CommunityRegisterPostDTO")
@NoArgsConstructor
@Getter
public class CommunityRegisterPostDTO {
    @ApiModelProperty(name="글 제목")
    private String communityTitle;

    @ApiModelProperty(name="글 내용")
    private String communityDescription;

    @ApiModelProperty(name="작성자 유저 주소")
    private String userAccount;

}
