package com.doners.donersbackend.application.dto.response.user;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("UserAccountResponseDTO")
@Getter
@ToString
@Builder
public class UserAccountResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name="userAccount")
    private String userAccount;

    public static UserAccountResponseDTO of(String message, Integer statusCode, UserAccountResponseDTO userAccountResponseDTO) {
        userAccountResponseDTO.setMessage(message);
        userAccountResponseDTO.setStatusCode(statusCode);

        return userAccountResponseDTO;
    }
}
