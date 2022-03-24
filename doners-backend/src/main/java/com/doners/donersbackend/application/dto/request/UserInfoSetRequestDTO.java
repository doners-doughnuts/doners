package com.doners.donersbackend.application.dto.request;

import com.doners.donersbackend.domain.enums.UserCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel("UserInfoPostDto")
@NoArgsConstructor
@Getter
public class UserInfoSetRequestDTO {

    @NotNull
    @NotBlank
    @ApiModelProperty(name="이름")
    private String userName;

    @NotNull
    @NotBlank
    @ApiModelProperty(name="닉네임")
    private String userNickname;

    @Email
    @NotBlank
    @ApiModelProperty(name="이메일 주소")
    private String userEmail;

    @NotNull
    @NotBlank
    @ApiModelProperty(name="메타마스크 계정 주소")
    private String userAccount;

    @NotNull
    @ApiModelProperty(name="회원 코드")
    private UserCode userCode;

}
