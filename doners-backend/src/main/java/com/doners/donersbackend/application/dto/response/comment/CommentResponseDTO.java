package com.doners.donersbackend.application.dto.response.comment;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ApiModel("CommentResponseDTO")
@Getter
@ToString
public class CommentResponseDTO {
    @ApiModelProperty(name = "댓글 ID")
    private String commentId;

    @ApiModelProperty(name = "댓글 내용")
    private String commentDescription;

    @ApiModelProperty(name = "작성자 닉네임")
    private String nickname;

    @ApiModelProperty(name = "작성 시간")
    private LocalDateTime commentCreateTime;

    @Builder
    public CommentResponseDTO(String commentId, LocalDateTime commentCreateTime, String commentDescription, String nickname) {
        this.commentId = commentId;
        this.commentCreateTime = commentCreateTime;
        this.commentDescription = commentDescription;
        this.nickname = nickname;
    }

}
