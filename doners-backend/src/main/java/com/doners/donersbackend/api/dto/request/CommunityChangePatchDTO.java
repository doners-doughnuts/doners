package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("CommunityChangePatchDTO")
@NoArgsConstructor
@Getter
public class CommunityChangePatchDTO {
    @ApiModelProperty(name="글 제목")
    private String communityTitle;

    @ApiModelProperty(name="글 내용")
    private String communityDescription;

}
