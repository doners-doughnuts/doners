package com.doners.donersbackend.application.dto.request.community;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@ApiModel("CommunityChangePatchDTO")
@NoArgsConstructor
@Getter
public class CommunityChangePatchDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name="커뮤니티 ID")
    private String communityId;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="커뮤니티 제목")
    private String communityTitle;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="커뮤니티 내용")
    private String communityDescription;

}
