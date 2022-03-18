package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("AppreciationRegisterPostDTO")
@NoArgsConstructor
@Getter
public class AppreciationRegisterPostDTO {
    @ApiModelProperty(name="글 제목")
    private String appreciationTitle;

    @ApiModelProperty(name="글 내용")
    private String appreciationDescription;

    @ApiModelProperty(name="작성자 유저 주소")
    private String userAccount;
}
