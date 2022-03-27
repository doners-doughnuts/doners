package com.doners.donersbackend.application.dto.response.community;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import com.doners.donersbackend.application.dto.response.comment.CommentResponseDTO;
import com.doners.donersbackend.domain.enums.CommunityCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@ApiModel("CommunityResponseDTO")
@Getter
@ToString
public class CommunityResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "커뮤니티 글 제목")
    private String communityTitle;

    @ApiModelProperty(name = "커뮤니티 글 조회수")
    private long communityViews;

    @ApiModelProperty(name = "커뮤니티 글 내용")
    private String communityDescription;

    @ApiModelProperty(name = "커뮤니티 글 작성일")
    private LocalDateTime communityCreateTime;

    @ApiModelProperty(name = "댓글 리스트")
    private List<CommentResponseDTO> commentResponseDTOList;

    @ApiModelProperty(name = "커뮤니티 글 작성자 이름")
    private String communityWriter;

    @ApiModelProperty(name = "커뮤니티 코드")
    private CommunityCode communityCode;

    @Builder
    public CommunityResponseDTO(String communityTitle, long communityViews, String communityDescription,
                                LocalDateTime communityCreateTime, List<CommentResponseDTO> commentResponseDTOList, String communityWriter, CommunityCode communityCode) {
        this.communityTitle = communityTitle;
        this.communityViews = communityViews;
        this.communityDescription = communityDescription;
        this.communityCreateTime = communityCreateTime;
        this.commentResponseDTOList = commentResponseDTOList;
        this.communityWriter = communityWriter;
        this.communityCode = communityCode;
    }

    public static CommunityResponseDTO of(String message, Integer statusCode, CommunityResponseDTO communityResponseDTO) {
        CommunityResponseDTO res = communityResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
