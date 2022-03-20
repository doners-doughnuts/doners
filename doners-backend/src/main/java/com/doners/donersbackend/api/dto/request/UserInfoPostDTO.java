package com.doners.donersbackend.api.dto.request;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@ApiModel("UserSignUpPostDto")
@NoArgsConstructor
@Getter
public class UserInfoPostDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name="이름")
    private String userName;

    @Email
    @NotBlank
    @ApiModelProperty(name="이메일 주소")
    private String userEmail;

    @NotNull
    @NotBlank
    @ApiModelProperty(name="닉네임")
    private String userNickname;
}
