package com.doners.donersbackend.application.dto.request.donation;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@ApiModel("NotificationReadPatchDTO")
@Getter
@ToString
public class NotificationReadPatchDTO {

    @ApiModelProperty(name = "알림 ID")
    @NotBlank
    private String notificationId;

}
