package com.doners.donersbackend.api.dto.response.comment;

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

    @ApiModelProperty(name = "작성 시간")
    private LocalDateTime commentCreateTime;

    @ApiModelProperty(name = "댓글 내용")
    private String commentDescription;

    @Builder
    public CommentResponseDTO(String commentId, LocalDateTime commentCreateTime,String commentDescription) {
        this.commentId = commentId;
        this.commentCreateTime = commentCreateTime;
        this.commentDescription = commentDescription;
    }

}
