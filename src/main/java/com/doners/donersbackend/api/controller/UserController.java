package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.api.dto.request.UserInfoPostDto;
import com.doners.donersbackend.api.service.UserService;
import com.doners.donersbackend.common.model.BaseResponseDto;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@Api(value="User API", tags={"User"})
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping
    @ApiOperation(value="필수 회원 정보 입력 - 이름, 이메일, 닉네임")
    @ApiResponses({
            @ApiResponse(code=200, message="필수 회원 정보 입력에 성공했습니다."),
            @ApiResponse(code=409, message="필수 회원 정보 입력에 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDto> setUserInfo(
            @RequestBody @ApiParam(value="필수 회원 정보", required=true) UserInfoPostDto userInfoPostDto) {
        userService.setUserInfo(userInfoPostDto);

        return ResponseEntity.status(200).body(BaseResponseDto.of("필수 회원 정보 입력에 성공했습니다.", 200));
    }


    @PatchMapping("{userNickname}")
    @ApiOperation(value="닉네임 변경")
    @ApiResponses({
            @ApiResponse(code=200, message="닉네임을 성공적으로 변경했습니다."),
            @ApiResponse(code=400, message="해당 닉네임을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="닉네임 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDto> changeNickname(
            @PathVariable("userNickname") @ApiParam(value="닉네임", required=true) String userNickname) {

        try {
            Integer statusCode = userService.changeUserNickname(userNickname);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDto.of("닉네임 변경에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(400).body(BaseResponseDto.of("해당 닉네임을 찾을 수 없습니다.", 409));
        }

        return ResponseEntity.status(200).body(BaseResponseDto.of("닉네임을 성공적으로 변경했습니다.", 200));
    }

}
