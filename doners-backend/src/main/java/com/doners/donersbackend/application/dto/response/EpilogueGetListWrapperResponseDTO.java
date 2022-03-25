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
public class EpilogueGetListWrapperResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "감사 글 목록")
    private List<EpilogueGetListResponseDTO> epilougeGetListResponseDTOList;

    @Builder
    public EpilogueGetListWrapperResponseDTO(List<EpilogueGetListResponseDTO> epilougeGetListResponseDTOList) {
        this.epilougeGetListResponseDTOList = epilougeGetListResponseDTOList;
    }

    public static EpilogueGetListWrapperResponseDTO of(String message, Integer statusCode, EpilogueGetListWrapperResponseDTO epilougeGetListWrapperResponseDTO) {
        EpilogueGetListWrapperResponseDTO res = epilougeGetListWrapperResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
