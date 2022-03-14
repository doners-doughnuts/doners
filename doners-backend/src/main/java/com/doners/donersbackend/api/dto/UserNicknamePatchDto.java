package com.doners.donersbackend.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("NicknamePatchDto")
@NoArgsConstructor
@Getter
public class UserNicknamePatchDto {

    @ApiModelProperty(name="변경할 닉네임")
    private String userNickname;
}
