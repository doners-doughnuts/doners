package com.doners.donersbackend.api.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ApiModel("AppreciationGetListResponseDTO")
@Getter
@ToString
public class AppreciationGetListResponseDTO {
    @ApiModelProperty(name = "감사 글 ID")
    private String appreciationId;


    @ApiModelProperty(name = "감사 글 제목")
    private String appreciationTitle;

    @ApiModelProperty(name = "감사 글 내용")
    private String appreciationDescription;

    @ApiModelProperty(name = "감사 글 조회수")
    private LocalDateTime appreciationCreateTime;

    @ApiModelProperty(name = "감사 글 조회수")
    private long appreciationViews;

    @ApiModelProperty(name = "감사 글 작성자")
    private String appreciationWriter;

    @Builder
    public AppreciationGetListResponseDTO(String appreciationId, String appreciationTitle, String appreciationDescription,
                                       LocalDateTime appreciationCreateTime, long appreciationViews,String appreciationWriter) {
        this.appreciationId = appreciationId;
        this.appreciationTitle = appreciationTitle;
        this.appreciationDescription = appreciationDescription;
        this.appreciationCreateTime = appreciationCreateTime;
        this.appreciationViews = appreciationViews;
        this.appreciationWriter = appreciationWriter;
    }
}
