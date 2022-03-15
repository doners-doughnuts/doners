package com.doners.donersbackend.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("UserSignUpPostDto")
@NoArgsConstructor
@Getter
public class UserInfoPostDTO {

    @ApiModelProperty(name="이름")
    private String userName;

    @ApiModelProperty(name="이메일 주소")
    private String userEmail;

    @ApiModelProperty(name="닉네임")
    private String userNickname;
}
