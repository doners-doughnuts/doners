package com.doners.donersbackend.application.dto.request.email;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@ApiModel("EmailConfirmationCreateRequestDTO")
@Getter
@ToString
@NoArgsConstructor
public class EmailConfirmationCreateRequestDTO {
    @Email
    @NotBlank
    @ApiModelProperty(name="이메일 주소")
    private String emailAddress;
}
