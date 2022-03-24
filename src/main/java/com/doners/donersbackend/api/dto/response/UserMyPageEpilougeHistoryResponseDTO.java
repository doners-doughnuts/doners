package com.doners.donersbackend.api.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ApiModel("UserMyPageEpilougeHistoryResponseDTO")
@Getter
@ToString
@Builder
public class UserMyPageEpilougeHistoryResponseDTO {

    @ApiModelProperty(name = "커뮤니티 글 ID")
    private String epilougeId;

    @ApiModelProperty(name = "커뮤니티 글 제목")
    private String epilougeTitle;

    @ApiModelProperty(name = "커뮤니티 글 작성 시간")
    private LocalDateTime epilougeCreateTime;

    @Builder
    public UserMyPageEpilougeHistoryResponseDTO(String epilougeId, String epilougeTitle, LocalDateTime epilougeCreateTime) {
        this.epilougeId = epilougeId;
        this.epilougeTitle = epilougeTitle;
        this.epilougeCreateTime = epilougeCreateTime;
    }
}
