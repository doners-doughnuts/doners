package com.doners.donersbackend.application.dto.response.donation;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ApiModel("NotificationResponseDTO")
@Getter
@ToString
public class NotificationResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name = "알림 ID")
    private String notificationId;

    @ApiModelProperty(name = "기부글 ID")
    private String donationId;

    @ApiModelProperty(name = "알림 내용")
    private String description;

    @ApiModelProperty(name = "생성 시간")
    private LocalDateTime createTime;

    @Builder
    public NotificationResponseDTO(String notificationId, String donationId, String description, LocalDateTime createTime) {
        this.notificationId = notificationId;
        this.donationId = donationId;
        this.description = description;
        this.createTime = createTime;
    }

    public static NotificationResponseDTO of(String message, Integer statusCode, NotificationResponseDTO donationResponseDTO) {
        NotificationResponseDTO res = donationResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }

}
