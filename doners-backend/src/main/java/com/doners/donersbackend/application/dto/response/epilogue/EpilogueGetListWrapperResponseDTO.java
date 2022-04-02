package com.doners.donersbackend.application.dto.response.epilogue;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
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
    @ApiModelProperty(name = "에필로그 목록")
    private List<EpilogueGetListResponseDTO> epilogueGetListResponseDTOList;

    @Builder
    public EpilogueGetListWrapperResponseDTO(List<EpilogueGetListResponseDTO> epilogueGetListResponseDTOList) {
        this.epilogueGetListResponseDTOList = epilogueGetListResponseDTOList;
    }

    public static EpilogueGetListWrapperResponseDTO of(String message, Integer statusCode, EpilogueGetListWrapperResponseDTO epilogueGetListWrapperResponseDTO) {
        EpilogueGetListWrapperResponseDTO res = epilogueGetListWrapperResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
