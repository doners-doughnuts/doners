package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("CommentChangePatchDTO")
@NoArgsConstructor
@Getter
public class CommentChangePatchDTO {

    @ApiModelProperty(name="댓글 내용")
    private String commentDescription;

}
