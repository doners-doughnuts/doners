package com.doners.donersbackend.application.dto.response.user;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import com.doners.donersbackend.domain.enums.UserCode;
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

    @ApiModelProperty(name="accessToken")
    private String accessToken;

    @ApiModelProperty(name="닉네임")
    private String userNickname;

    @ApiModelProperty(name="회원 코드")
    private UserCode userCode;

    public void changeAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public static UserLoginResponseDTO of(String message, Integer statusCode, UserLoginResponseDTO userLoginResponseDTO) {
        userLoginResponseDTO.setMessage(message);
        userLoginResponseDTO.setStatusCode(statusCode);

        return userLoginResponseDTO;
    }
}
