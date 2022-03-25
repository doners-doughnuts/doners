package com.doners.donersbackend.application.dto.request.comment;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@ApiModel("CommentChangePatchDTO")
@NoArgsConstructor
@Getter
public class CommentChangePatchDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name="댓글 내용")
    private String commentDescription;

}
