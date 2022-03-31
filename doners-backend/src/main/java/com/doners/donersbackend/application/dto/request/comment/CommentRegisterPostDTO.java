package com.doners.donersbackend.application.dto.request.comment;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@ApiModel("CommentRegisterPostDTO")
@NoArgsConstructor
@Getter
public class CommentRegisterPostDTO {

    @ApiModelProperty(name="에필로그 ID")
    private String epilogueId;

    @ApiModelProperty(name="커뮤니티 ID")
    private String communityId;

    @ApiModelProperty(name="댓글 id")
    private String commentId;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="댓글 내용")
    private String commentDescription;
}
