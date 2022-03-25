package com.doners.donersbackend.application.dto.response.epilogue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ApiModel("epilogueGetListResponseDTO")
@Getter
@ToString
public class EpilogueGetListResponseDTO {
    @ApiModelProperty(name = "감사 글 ID")
    private String epilogueId;

    @ApiModelProperty(name = "감사 글 제목")
    private String epilogueTitle;

    @ApiModelProperty(name = "감사 글 내용")
    private String epilogueDescription;

    @ApiModelProperty(name = "감사 글 조회수")
    private LocalDateTime epilogueCreateTime;

    @ApiModelProperty(name = "감사 글 조회수")
    private long epilogueViews;

    @ApiModelProperty(name = "감사 글 작성자")
    private String epilogueWriter;

    @Builder
    public EpilogueGetListResponseDTO(String epilogueId, String epilogueTitle, String epilogueDescription,
                                      LocalDateTime epilogueCreateTime, long epilogueViews, String epilogueWriter) {
        this.epilogueId = epilogueId;
        this.epilogueTitle = epilogueTitle;
        this.epilogueDescription = epilogueDescription;
        this.epilogueCreateTime = epilogueCreateTime;
        this.epilogueViews = epilogueViews;
        this.epilogueWriter = epilogueWriter;
    }
}
