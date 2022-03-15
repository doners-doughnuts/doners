package com.doners.donersbackend.common.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@ApiModel("BaseResponseDto")
public class BaseResponseDTO {
    @ApiModelProperty(name="응답 메세지", example="성공")
    String message;

    @ApiModelProperty(name="응답 코드", example="200")
    Integer statusCode;

    public BaseResponseDTO() {}

    public BaseResponseDTO(String message, Integer statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }

    public static BaseResponseDTO of(String message, Integer statusCode) {
        return BaseResponseDTO.builder()
                .message(message)
                .statusCode(statusCode).build();
    }
}
