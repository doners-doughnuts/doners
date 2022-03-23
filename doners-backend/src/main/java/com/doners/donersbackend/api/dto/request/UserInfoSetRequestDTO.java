package com.doners.donersbackend.api.dto.request;

import com.doners.donersbackend.db.enums.ApprovalStatusCode;
import com.doners.donersbackend.db.enums.UserCode;
import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

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

    @NotBlank
    @ApiModelProperty(name="회원 코드")
    private UserCode userCode;

}
