package com.doners.donersbackend.application.dto.request.donation;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@ApiModel("NotificationReadDTO")
@Getter
@ToString
public class NotificationReadDTO {

    @ApiModelProperty(name = "알림 ID")
    @NotBlank
    private String notificationId;

}
