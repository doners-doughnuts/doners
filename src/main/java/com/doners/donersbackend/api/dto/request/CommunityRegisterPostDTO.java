package com.doners.donersbackend.api.dto.request;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@ApiModel("CommunityRegisterPostDTO")
@NoArgsConstructor
@Getter
public class CommunityRegisterPostDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name="글 제목")
    private String communityTitle;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="글 내용")
    private String communityDescription;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="작성자 유저 주소")
    private String userAccount;

}
