package com.doners.donersbackend.application.dto.response.donation;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ApiModel("DonationGetListWrapperResponseDTO")
@Getter
@ToString
public class NotificationGetListWrapperResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name = "알림 목록")
    private List<NotificationGetListResponseDTO> notificationGetListResponseDTOList;

    @Builder
    public NotificationGetListWrapperResponseDTO(List<NotificationGetListResponseDTO> notificationGetListResponseDTOList) {
        this.notificationGetListResponseDTOList = notificationGetListResponseDTOList;
    }

    public static NotificationGetListWrapperResponseDTO of(String message, Integer statusCode, NotificationGetListWrapperResponseDTO notificationGetListWrapperResponseDTO) {
        NotificationGetListWrapperResponseDTO res = notificationGetListWrapperResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }

}
