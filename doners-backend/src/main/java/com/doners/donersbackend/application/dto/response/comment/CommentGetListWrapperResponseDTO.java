package com.doners.donersbackend.application.dto.response.comment;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ApiModel("CommentGetListWrapperResponseDTO")
@Getter
@ToString
public class CommentGetListWrapperResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name="커뮤니티 - 댓글 정보 리스트")
    private List<CommentResponseDTO> commentResponseDTOList;

    @Builder
    public CommentGetListWrapperResponseDTO(List<CommentResponseDTO> commentResponseDTOList) {
        this.commentResponseDTOList = commentResponseDTOList;
    }

    public static CommentGetListWrapperResponseDTO of(Integer statusCode, String message, CommentGetListWrapperResponseDTO commentGetListWrapperResponseDto) {
        CommentGetListWrapperResponseDTO res = commentGetListWrapperResponseDto;
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }
}
