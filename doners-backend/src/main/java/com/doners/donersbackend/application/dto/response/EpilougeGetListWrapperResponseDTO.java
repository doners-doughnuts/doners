package com.doners.donersbackend.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ApiModel("AppreciationGetListWrapperResponseDTO")
@Getter
@ToString
public class EpilougeGetListWrapperResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "감사 글 목록")
    private List<EpilougeGetListResponseDTO> epilougeGetListResponseDTOList;

    @Builder
    public EpilougeGetListWrapperResponseDTO(List<EpilougeGetListResponseDTO> epilougeGetListResponseDTOList) {
        this.epilougeGetListResponseDTOList = epilougeGetListResponseDTOList;
    }

    public static EpilougeGetListWrapperResponseDTO of(String message, Integer statusCode, EpilougeGetListWrapperResponseDTO epilougeGetListWrapperResponseDTO) {
        EpilougeGetListWrapperResponseDTO res = epilougeGetListWrapperResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
