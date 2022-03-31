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
    @ApiModelProperty(name = "에필로그 ID")
    private String epilogueId;

    @ApiModelProperty(name = "에필로그 제목")
    private String epilogueTitle;

    @ApiModelProperty(name = "에필로그 내용")
    private String epilogueDescription;

    @ApiModelProperty(name = "에필로그 조회수")
    private LocalDateTime epilogueCreateTime;

    @ApiModelProperty(name = "에필로그 조회수")
    private long epilogueViews;

    @ApiModelProperty(name = "에필로그 작성자")
    private String epilogueWriter;

    @ApiModelProperty(name = "에필로그 썸네일 주소")
    private String epilogueThumbnailImage;

    @Builder
    public EpilogueGetListResponseDTO(String epilogueId, String epilogueTitle, String epilogueDescription,
                                      LocalDateTime epilogueCreateTime, long epilogueViews, String epilogueWriter, String epilogueThumbnailImage) {
        this.epilogueId = epilogueId;
        this.epilogueTitle = epilogueTitle;
        this.epilogueDescription = epilogueDescription;
        this.epilogueCreateTime = epilogueCreateTime;
        this.epilogueViews = epilogueViews;
        this.epilogueWriter = epilogueWriter;
        this.epilogueThumbnailImage = epilogueThumbnailImage;
    }
}
