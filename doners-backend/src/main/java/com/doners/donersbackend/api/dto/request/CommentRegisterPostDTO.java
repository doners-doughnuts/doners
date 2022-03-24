package com.doners.donersbackend.api.dto.request;

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

    @ApiModelProperty(name="감사글 id")
    private String epilougeId;

    @ApiModelProperty(name="커뮤니티 id")
    private String communityId;

    @ApiModelProperty(name="댓글 id")
    private String commentId;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="댓글 내용")
    private String commentDescription;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="작성자 유저 주소")
    private String userAccount;
}
