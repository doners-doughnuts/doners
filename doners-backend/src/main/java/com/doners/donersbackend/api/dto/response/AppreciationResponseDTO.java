package com.doners.donersbackend.api.dto.response;

import com.doners.donersbackend.common.model.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
@ApiModel("AppreciationResponseDTO")
@Getter
@ToString
public class AppreciationResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "감사 글 제목")
    private String appreciationTitle;

    @ApiModelProperty(name = "감사 글 조회수")
    private long appreciationViews;

    @ApiModelProperty(name = "감사 글 내용")
    private String appreciationDescription;

    @ApiModelProperty(name = "감사 글 작성일")
    private LocalDateTime appreciationCreateTime;

    @ApiModelProperty(name = "댓글 리스트")
    private List<CommentResponseDTO> commentResponseDTOList;

    @ApiModelProperty(name = "감사 글 작성자 이름")
    private String appreciationWriter;

    @ApiModelProperty(name = "댓글 리스트")
    private List<AppreciationBudgetResponseDTO> appreciationBudgetResponseDTOList;

    @Builder
    public AppreciationResponseDTO(String appreciationTitle, long appreciationViews, String appreciationDescription,
                                LocalDateTime appreciationCreateTime, List<CommentResponseDTO> commentResponseDTOList, String appreciationWriter
    ,List<AppreciationBudgetResponseDTO> appreciationBudgetResponseDTOList) {
        this.appreciationTitle = appreciationTitle;
        this.appreciationViews = appreciationViews;
        this.appreciationDescription = appreciationDescription;
        this.appreciationCreateTime = appreciationCreateTime;
        this.commentResponseDTOList = commentResponseDTOList;
        this.appreciationWriter = appreciationWriter;
        this.appreciationBudgetResponseDTOList = appreciationBudgetResponseDTOList;
    }

    public static AppreciationResponseDTO of(String message, Integer statusCode, AppreciationResponseDTO appreciationResponseDTO) {
        AppreciationResponseDTO res = appreciationResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
