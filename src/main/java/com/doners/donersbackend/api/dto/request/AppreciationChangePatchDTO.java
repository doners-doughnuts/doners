package com.doners.donersbackend.api.dto.request;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@ApiModel("CommunityChangePatchDTO")
@NoArgsConstructor
@Getter
public class AppreciationChangePatchDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name="글 제목")
    private String appreciationTitle;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="글 내용")
    private String appreciationDescription;
}
