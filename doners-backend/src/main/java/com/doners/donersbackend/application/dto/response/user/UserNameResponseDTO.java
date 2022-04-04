package com.doners.donersbackend.application.dto.response.user;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("UserNameResponseDTO")
@Getter
@ToString
@Builder
public class UserNameResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name="회원 이름")
    private String userName;

    public static UserNameResponseDTO of(String message, Integer statusCode, UserNameResponseDTO userNameResponseDTO) {
        userNameResponseDTO.setMessage(message);
        userNameResponseDTO.setStatusCode(statusCode);

        return userNameResponseDTO;
    }
}
