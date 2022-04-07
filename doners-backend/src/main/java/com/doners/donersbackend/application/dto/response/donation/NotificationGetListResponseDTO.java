package com.doners.donersbackend.application.dto.response.donation;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("NotificationGetListResponseDTO")
@Getter
@ToString
public class NotificationGetListResponseDTO {

    @ApiModelProperty(name = "알림 ID")
    private String notificationId;

    @ApiModelProperty(name = "기부글 ID")
    private String donationId;

    @ApiModelProperty(name = "알림 내용")
    private String description;

    @ApiModelProperty(name = "생성 시간")
    private String createTime;

    @ApiModelProperty(name = "읽음 여부")
    private boolean read;

    @Builder
    public NotificationGetListResponseDTO(String notificationId, String donationId, String description, String createTime, boolean read) {
        this.notificationId = notificationId;
        this.donationId = donationId;
        this.description = description;
        this.createTime = createTime;
        this.read = read;
    }

}
