package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("CommentRegisterPostDTO")
@NoArgsConstructor
@Getter
public class CommentRegisterPostDTO {

    @ApiModelProperty(name="감사글 id")
    private String appreciationId;

    @ApiModelProperty(name="커뮤니티 id")
    private String communityId;

    @ApiModelProperty(name="댓글 내용")
    private String commentDescription;

    @ApiModelProperty(name="작성자 유저 주소")
    private String userAccount;
}
