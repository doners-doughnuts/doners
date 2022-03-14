package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.api.dto.UserNicknamePatchDto;
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

//    @PostMapping("/signup")
//    @ApiOperation(value="회원가입", notes="회원가입")

    @PatchMapping
    @ApiOperation(value="닉네임 변경")
    @ApiResponses({
            @ApiResponse(code=200, message="닉네임을 성공적으로 변경했습니다."),
            @ApiResponse(code=409, message="닉네임 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDto> changeNickname(
            @RequestBody @ApiParam(value="변경할 닉네임", required = true) UserNicknamePatchDto userNicknamePatchDto) {

        Integer statusCode = userService.changeUserNickname(userNicknamePatchDto);

        if(statusCode == 409)
            return ResponseEntity.status(409).body(BaseResponseDto.of("닉네임 변경에 실패했습니다.", 409));
        else
            return ResponseEntity.status(200).body(BaseResponseDto.of("닉네임을 성공적으로 변경했습니다.", 200));
    }

//        try {
//            Integer statusCode = userService.changeUserNickname(userNicknamePatchDto);
//            return ResponseEntity.status(200).body(BaseResponseDto.of("닉네임을 성공적으로 변경했습니다.", 200));
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(409).body(BaseResponseDto.of("닉네임 변경에 실패했습니다.", 409));
//        }

}
