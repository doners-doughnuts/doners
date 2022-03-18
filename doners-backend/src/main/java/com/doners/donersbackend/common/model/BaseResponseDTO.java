package com.doners.donersbackend.common.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@ApiModel("BaseResponseDTO")
@Setter
@Getter
public class BaseResponseDTO {

    @ApiModelProperty(name = "응답 메시지", example = "성공")
    String message;

    @ApiModelProperty(name = "응답 코드", example = "200")
    Integer statusCode;

    public BaseResponseDTO() {
    }

    public BaseResponseDTO(String message, Integer statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }

    public static BaseResponseDTO of(String message, Integer statusCode) {
        BaseResponseDTO baseResponseDTO = new BaseResponseDTO();
        baseResponseDTO.message = message;
        baseResponseDTO.statusCode = statusCode;

        return baseResponseDTO;
    }

}

