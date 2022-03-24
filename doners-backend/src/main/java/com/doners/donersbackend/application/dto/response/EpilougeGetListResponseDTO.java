package com.doners.donersbackend.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ApiModel("epilougeGetListResponseDTO")
@Getter
@ToString
public class EpilougeGetListResponseDTO {
    @ApiModelProperty(name = "감사 글 ID")
    private String epilougeId;

    @ApiModelProperty(name = "감사 글 제목")
    private String epilougeTitle;

    @ApiModelProperty(name = "감사 글 내용")
    private String epilougeDescription;

    @ApiModelProperty(name = "감사 글 조회수")
    private LocalDateTime epilougeCreateTime;

    @ApiModelProperty(name = "감사 글 조회수")
    private long epilougeViews;

    @ApiModelProperty(name = "감사 글 작성자")
    private String epilougeWriter;

    @Builder
    public EpilougeGetListResponseDTO(String epilougeId, String epilougeTitle, String epilougeDescription,
                                      LocalDateTime epilougeCreateTime, long epilougeViews, String epilougeWriter) {
        this.epilougeId = epilougeId;
        this.epilougeTitle = epilougeTitle;
        this.epilougeDescription = epilougeDescription;
        this.epilougeCreateTime = epilougeCreateTime;
        this.epilougeViews = epilougeViews;
        this.epilougeWriter = epilougeWriter;
    }
}
