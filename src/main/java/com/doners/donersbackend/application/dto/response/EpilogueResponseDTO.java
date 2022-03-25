package com.doners.donersbackend.application.dto.response;

import com.doners.donersbackend.application.dto.response.comment.CommentResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
@ApiModel("EpilougeResponseDTO")
@Getter
@ToString
public class EpilogueResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "감사 글 제목")
    private String epilougeTitle;

    @ApiModelProperty(name = "감사 글 조회수")
    private long epilougeViews;

    @ApiModelProperty(name = "감사 글 내용")
    private String epilougeDescription;

    @ApiModelProperty(name = "감사 글 작성일")
    private LocalDateTime epilougeCreateTime;

    @ApiModelProperty(name = "댓글 리스트")
    private List<CommentResponseDTO> commentResponseDTOList;

    @ApiModelProperty(name = "감사 글 작성자 이름")
    private String epilougeWriter;

    @ApiModelProperty(name = "댓글 리스트")
    private List<EpilogueBudgetResponseDTO> epilougeBudgetResponseDTOList;

    @Builder
    public EpilogueResponseDTO(String epilougeTitle, long epilougeViews, String epilougeDescription,
                               LocalDateTime epilougeCreateTime, List<CommentResponseDTO> commentResponseDTOList, String epilougeWriter
    , List<EpilogueBudgetResponseDTO> epilougeBudgetResponseDTOList) {
        this.epilougeTitle = epilougeTitle;
        this.epilougeViews = epilougeViews;
        this.epilougeDescription = epilougeDescription;
        this.epilougeCreateTime = epilougeCreateTime;
        this.commentResponseDTOList = commentResponseDTOList;
        this.epilougeWriter = epilougeWriter;
        this.epilougeBudgetResponseDTOList = epilougeBudgetResponseDTOList;
    }

    public static EpilogueResponseDTO of(String message, Integer statusCode, EpilogueResponseDTO epilougeResponseDTO) {
        EpilogueResponseDTO res = epilougeResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
