package com.doners.donersbackend.application.dto.request;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@ApiModel("EpilougeChangePatchDTO")
@NoArgsConstructor
@Getter
public class EpilogueChangePatchDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name="글 제목")
    private String epilougeTitle;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="글 내용")
    private String epilougeDescription;
}
