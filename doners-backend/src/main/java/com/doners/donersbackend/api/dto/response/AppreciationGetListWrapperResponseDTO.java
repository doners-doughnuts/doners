package com.doners.donersbackend.api.dto.response;

import com.doners.donersbackend.common.model.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ApiModel("AppreciationGetListWrapperResponseDTO")
@Getter
@ToString
public class AppreciationGetListWrapperResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "감사 글 목록")
    private List<AppreciationGetListResponseDTO> appreciationGetListResponseDTOList;

    @Builder
    public AppreciationGetListWrapperResponseDTO(List<AppreciationGetListResponseDTO> appreciationGetListResponseDTOList) {
        this.appreciationGetListResponseDTOList = appreciationGetListResponseDTOList;
    }

    public static AppreciationGetListWrapperResponseDTO of(String message, Integer statusCode, AppreciationGetListWrapperResponseDTO appreciationGetListWrapperResponseDTO) {
        AppreciationGetListWrapperResponseDTO res = appreciationGetListWrapperResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
