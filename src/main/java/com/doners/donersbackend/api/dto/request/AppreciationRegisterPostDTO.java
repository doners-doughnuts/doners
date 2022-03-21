package com.doners.donersbackend.api.dto.request;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@ApiModel("AppreciationRegisterPostDTO")
@NoArgsConstructor
@Getter
public class AppreciationRegisterPostDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name="글 제목")
    private String appreciationTitle;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="글 내용")
    private String appreciationDescription;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="작성자 유저 주소")
    private String userAccount;
}
