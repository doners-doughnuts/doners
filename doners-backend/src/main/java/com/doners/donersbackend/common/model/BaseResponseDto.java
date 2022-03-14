package com.doners.donersbackend.common.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;

@Builder
@ApiModel("BaseResponseDto")
public class BaseResponseDto {
    @ApiModelProperty(name="응답 메세지", example="성공")
    String message;

    @ApiModelProperty(name="응답 코드", example="200")
    Integer statusCode;

    public BaseResponseDto() {}

    public BaseResponseDto(String message, Integer statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }

    public static BaseResponseDto of(String message, Integer statusCode) {
        return BaseResponseDto.builder()
                .message(message)
                .statusCode(statusCode).build();
    }
}
