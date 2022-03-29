package com.doners.donersbackend.application.dto.response.user;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("UserProfileImageResponseDTO")
@Getter
@ToString
@Builder
public class UserProfileImageResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name = "프로필 이미지 주소")
    private String profileImage;

    public static UserProfileImageResponseDTO of(String message, Integer statusCode, UserProfileImageResponseDTO userProfileImageResponseDTO) {
        userProfileImageResponseDTO.setMessage(message);
        userProfileImageResponseDTO.setStatusCode(statusCode);

        return userProfileImageResponseDTO;
    }
}
