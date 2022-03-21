package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.api.dto.request.UserInfoSetRequestDTO;
import com.doners.donersbackend.api.dto.request.UserNicknameChangeRequestDTO;
import com.doners.donersbackend.api.dto.response.UserLoginResponseDTO;
import com.doners.donersbackend.api.service.AwsS3Service;
import com.doners.donersbackend.api.service.UserService;
import com.doners.donersbackend.common.model.BaseResponseDTO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@Api(value="User API", tags={"User"})
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final AwsS3Service awsS3Service;

    @PostMapping
    @ApiOperation(value="필수 회원정보 입력 - 이름, 닉네임, 이메일, 메타마스크 계정 주소")
    @ApiResponses({
            @ApiResponse(code=201, message="필수 회원정보 입력에 성공했습니다."),
            @ApiResponse(code=409, message="필수 회원정보 입력에 실패했습니다. / 이미 해당 이메일이나 메타마스크 계정 주소로 가입된 계정이 존재합니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> setUserInfo(
            @RequestBody @Valid @ApiParam(value="필수 회원 정보", required=true) UserInfoSetRequestDTO userInfoSetRequestDTO) {
        try {
            Integer statusCode = userService.setUserInfo(userInfoSetRequestDTO);

            if(statusCode == 409) {
                return ResponseEntity.status(409).body(BaseResponseDTO.of("이미 해당 이메일이나 메타마스크 계정 주소로 가입된 계정이 존재합니다.", 409));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("필수 회원정보 입력에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("필수 회원정보 입력에 성공했습니다.", 201));
    }

    @GetMapping("/{userAccount}")
    @ApiOperation(value="로그인")
    @ApiResponses({
            @ApiResponse(code=200, message="로그인에 성공했습니다."),
            @ApiResponse(code=404, message="해당 메타마스크 계정 주소로 가입된 정보가 없습니다."),
            @ApiResponse(code=409, message="로그인에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> login(
            @PathVariable("userAccount") @ApiParam(value="메타마스크 계정 주소", required=true) String userAccount) {
        UserLoginResponseDTO userLoginResponseDTO = null;

        try {
            userLoginResponseDTO = userService.getUserLoginResponseDTO(userAccount);

            if(userLoginResponseDTO == null) {
                return ResponseEntity.status(409).body(BaseResponseDTO.of("로그인에 실패했습니다.", 201));
            }

            // 추후 적용
//            String accessToken = ;
//            userLoginResponseDTO.changeAccessToken(accessToken);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 메타마스크 계정 주소로 가입된 정보가 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(UserLoginResponseDTO.of("로그인에 성공했습니다.", 200, userLoginResponseDTO));
    }


    @PatchMapping("/nickname")
    @ApiOperation(value="닉네임 변경")
    @ApiResponses({
            @ApiResponse(code=200, message="닉네임 변경에 성공했습니다."),
            @ApiResponse(code=404, message="해당 닉네임을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="닉네임 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> changeNickname(
//            @PathVariable("userNickname") @ApiParam(value="닉네임", required=true) String userNickname) {
            @RequestBody @ApiParam(value="변경할 닉네임", required=true) UserNicknameChangeRequestDTO userNicknameChangeRequestDTO) {
        String userNickname = userNicknameChangeRequestDTO.getUserNickname();

        try {
            Integer statusCode = userService.changeUserNickname(userNickname);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("닉네임 변경에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 닉네임을 찾을 수 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("닉네임 변경에 성공했습니다.", 200));
    }

    @GetMapping("/check/{userNickname}")
    @ApiOperation(value="닉네임 중복 검사")
    @ApiResponses({
            @ApiResponse(code=200, message="해당 닉네임은 사용 가능합니다."),
            @ApiResponse(code=409, message="해당 닉네임은 사용 불가능합니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> checkNickname(
            @PathVariable("userNickname") @ApiParam(value="중복 검사하려는 닉네임", required=true) String userNickname) {
        try {
            Integer statusCode = userService.checkNickname(userNickname);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("해당 닉네임은 사용 불가능합니다.", 409));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("해당 닉네임은 사용 불가능합니다.", 409));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("해당 닉네임은 사용 가능합니다.", 409));
    }

    @PostMapping("/image")
    @ApiOperation(value="프로필 이미지 등록")
    @ApiResponses({
            @ApiResponse(code=201, message="프로필 이미지 등록에 성공했습니다."),
            @ApiResponse(code=404, message="회원 정보를 찾을 수 없습니다."),
            @ApiResponse(code=409, message="프로필 이미지 등록에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> uploadProfileImage(
            @ApiParam(value="프로필 이미지", required=true) @RequestPart MultipartFile multipartFile) {
        try {
            awsS3Service.uploadProfileImage(multipartFile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("회원 정보를 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("프로필 이미지 등록에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("프로필 이미지 등록에 성공했습니다.", 201));
    }
}
