package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.api.service.EmailConfirmationService;
import com.doners.donersbackend.common.model.BaseResponseDTO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin("*")
@Api(value="Email API", tags={"Email"})
@RequiredArgsConstructor
@RequestMapping("/api/email")
public class EmailConfirmationController {

    private final EmailConfirmationService emailConfirmationService;

    @PostMapping("/{emailAddress}")
    @ApiOperation(value="이메일 인증 요청")
    @ApiResponses({
            @ApiResponse(code=201, message="인증 메일이 전송되었습니다. 해당 이메일 계정을 확인해주세요."),
            @ApiResponse(code=409, message="인증 메일 요청에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> createEmailConfirmation(
            @PathVariable("emailAddress") @ApiParam(value="이메일 주소", required=true) String emailAddress) {
        try {
            emailConfirmationService.createEmailConfirmation(emailAddress);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseDTO.of("인증 메일 전송 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("인증 메일이 전송되었습니다. 해당 이메일 계정을 확인해주세요.", 201));
    }

    @GetMapping("{emailAddress}")
    @ApiOperation(value="이메일 인증")
    @ApiResponses({
            @ApiResponse(code=200, message="이메일 인증이 완료되었습니다. 회원가입을 진행해주세요."),
            @ApiResponse(code=404, message="인증 대기 중인 이메일 정보를 찾을 수 없거나, 이미 인증 완료된 이메일입니다."),
            @ApiResponse(code=409, message="이메일 인증에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> confirmEmailAddress(
            @PathVariable("emailAddress") @ApiParam(value="이메일 주소", required=true) String emailAddress) {
        try {
            Integer statusCode = emailConfirmationService.confirmEmailAddress(emailAddress);

            if(statusCode == 409) {
                return ResponseEntity.status(409).body(BaseResponseDTO.of("이메일 인증에 실패했습니다.", 409));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("인증 대기 중인 이메일 정보를 찾을 수 없거나, 이미 인증 완료된 이메일입니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("이메일 인증이 완료되었습니다. 회원가입을 진행해주세요.", 200));
    }

    @GetMapping("/check/email/{emailAddress}")
    @ApiOperation(value="이메일 인증 완료 여부 확인")
    @ApiResponses({
            @ApiResponse(code=200, message="인증이 완료된 이메일입니다."),
            @ApiResponse(code=404, message="해당 이메일 정보를 찾을 수 없습니다."),
            @ApiResponse(code=409, message="인증이 완료되지 않은 이메일입니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> checkEmailConfirmation(
            @PathVariable("emailAddress") @ApiParam(value="이메일 주소", required=true) String emailAddress) {
        try {
            if(!emailConfirmationService.isConfirmedEmail(emailAddress)) {
                return ResponseEntity.status(409).body(BaseResponseDTO.of("인증이 완료되지 않은 이메일입니다.", 409));
            }
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 이메일 정보를 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("인증 완료된 이메일입니다.", 200));
    }
}
