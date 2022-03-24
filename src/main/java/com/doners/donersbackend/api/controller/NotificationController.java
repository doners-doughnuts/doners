package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import com.doners.donersbackend.application.dto.response.donation.NotificationResponseDTO;
import com.doners.donersbackend.application.service.NotificationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "Notification API", tags = {"Notification"})
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    @ApiOperation(value = "기부글 승인 알림")
    @ApiResponses({
            @ApiResponse(code = 200, message = "승인 알림이 있습니다."),
            @ApiResponse(code = 204, message = "승인 알림이 없습니다."),
            @ApiResponse(code = 404, message = "알림 확인에 필요한 정보를 찾을 수 없습니다."),
            @ApiResponse(code = 409, message = "알림 확인에 실패했습니다.")
    })
    @PostMapping("/approve")
    public ResponseEntity<? extends BaseResponseDTO> getApprovalInfo(
            @ApiIgnore @RequestHeader("Authorization") String accessToken
    ) {

        NotificationResponseDTO notificationResponseDTO = null;

        try {
            notificationResponseDTO = notificationService.getNotification(accessToken, 0);

            if (notificationResponseDTO == null) {
                return ResponseEntity.status(200).body(NotificationResponseDTO.of("승인 알림이 없습니다.", 200));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("알림 확인에 필요한 정보를 찾을 수 없습니다.", 409));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("알림 확인에 실패했습니다.", 409));
        }

        return ResponseEntity.ok(NotificationResponseDTO.of("승인 알림이 있습니다.", 200, notificationResponseDTO));

    }

    @ApiOperation(value = "기부글 종료 알림")
    @ApiResponses({
            @ApiResponse(code = 200, message = "종료 알림이 있습니다."),
            @ApiResponse(code = 204, message = "종료 알림이 없습니다."),
            @ApiResponse(code = 404, message = "알림 확인에 필요한 정보를 찾을 수 없습니다."),
            @ApiResponse(code = 409, message = "알림 확인에 실패했습니다.")
    })
    @PostMapping("/end")
    public ResponseEntity<? extends BaseResponseDTO> getEndInfo(
            @ApiIgnore @RequestHeader("Authorization") String accessToken
    ) {

        NotificationResponseDTO notificationResponseDTO = null;

        try {
            notificationResponseDTO = notificationService.getNotification(accessToken, 1);

            if (notificationResponseDTO == null) {
                return ResponseEntity.status(204).body(BaseResponseDTO.of("종료 알림이 없습니다.", 204));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("알림 확인에 필요한 정보를 찾을 수 없습니다.", 409));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("알림 확인에 실패했습니다.", 409));
        }

        return ResponseEntity.ok(NotificationResponseDTO.of("종료 알림이 있습니다.", 200, notificationResponseDTO));

    }

}
