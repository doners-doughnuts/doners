package com.doners.donersbackend.api.dto.response;

import com.doners.donersbackend.common.model.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("UserLoginResponseDTO")
@Getter
@ToString
@Builder
public class UserLoginResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name="JWT")
    private String accessToken;

    @ApiModelProperty(name="닉네임")
    private String userNickname;

    public void changeAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public static UserLoginResponseDTO of(String message, Integer statusCode, UserLoginResponseDTO userLoginResponseDTO) {
        userLoginResponseDTO.setMessage(message);
        userLoginResponseDTO.setStatusCode(statusCode);

        return userLoginResponseDTO;
    }
}
