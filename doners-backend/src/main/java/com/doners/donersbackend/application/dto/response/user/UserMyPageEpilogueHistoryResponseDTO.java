package com.doners.donersbackend.application.dto.response.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ApiModel("UserMyPageEpilogueHistoryResponseDTO")
@Getter
@ToString
@Builder
public class UserMyPageEpilogueHistoryResponseDTO {

    @ApiModelProperty(name = "감사 글 ID")
    private String epilogueId;

    @ApiModelProperty(name = "감사 글 제목")
    private String epilogueTitle;

    @ApiModelProperty(name = "감사 글 작성 시간")
    private LocalDateTime epilogueCreateTime;

    @Builder
    public UserMyPageEpilogueHistoryResponseDTO(String epilogueId, String epilogueTitle, LocalDateTime epilogueCreateTime) {
        this.epilogueId = epilogueId;
        this.epilogueTitle = epilogueTitle;
        this.epilogueCreateTime = epilogueCreateTime;
    }
}
