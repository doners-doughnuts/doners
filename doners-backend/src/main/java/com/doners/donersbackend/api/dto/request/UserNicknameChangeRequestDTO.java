package com.doners.donersbackend.api.dto.request;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@ApiModel("UserNicknameChangeRequestDto")
@NoArgsConstructor
@Getter
public class UserNicknameChangeRequestDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name="변경할 닉네임")
    private String userNickname;
}
