package com.doners.donersbackend.api.controller;

import com.doners.donersbackend.application.dto.request.user.UserInfoSetRequestDTO;
import com.doners.donersbackend.application.dto.request.user.UserNicknameChangeRequestDTO;
import com.doners.donersbackend.application.dto.response.donation.DonationGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.user.*;
import com.doners.donersbackend.application.service.DonationService;
import com.doners.donersbackend.application.service.UserService;
import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import com.doners.donersbackend.security.util.JwtAuthenticationProvider;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@Api(value="User API", tags={"User"})
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final DonationService donationService;

    private final AuthenticationManager authenticationManager;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

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

        // 로그인 ID, PW 기반으로 AutenticationToken 을 생성하여 검증 (사용자 비밀번호 체크)
        // authenticate 메소드가 실행될 때 UserDetailsServiceImpl 의 loadUserByUsername 메소드가 실행됨
        Authentication authentication = null;

        UserLoginResponseDTO userLoginResponseDTO = null;

        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userAccount, ""));

            userLoginResponseDTO = userService.getUserLoginResponseDTO(userAccount);

            if(userLoginResponseDTO == null) {
                return ResponseEntity.status(409).body(BaseResponseDTO.of("로그인에 실패했습니다.", 201));
            }

            // 인증 정보를 기반으로 JWT 생성
            userLoginResponseDTO.changeAccessToken(jwtAuthenticationProvider.createToken(authentication));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 메타마스크 계정 주소로 가입된 정보가 없습니다.", 404));
        }

        return ResponseEntity.status(200).body(UserLoginResponseDTO.of("로그인에 성공했습니다.", 200, userLoginResponseDTO));
    }

    @GetMapping("/account/{userNickname}")
    @ApiOperation(value="메타마스크 지갑 주소 불러오기")
    @ApiResponses({
            @ApiResponse(code=200, message="해당 회원의 메타마스크 지갑 주소를 불러왔습니다."),
            @ApiResponse(code=404, message="해당 회원이 존재하지 않습니다."),
            @ApiResponse(code=409, message="해당 회원의 메타마스크 지갑 주소를 불러오지 못했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getAccount(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("userNickname") @ApiParam(value="닉네임", required=true) String userNickname) {
        UserAccountResponseDTO userAccountResponseDTO = null;

        try {
            userAccountResponseDTO = userService.getUserAccountResponseDTO(accessToken, userNickname);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 회원이 존재하지 않습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("해당 회원의 메타마스크 지갑 주소를 불러오지 못했습니다.", 409));
        }

        return ResponseEntity.status(200).body(UserAccountResponseDTO.of("로그인에 성공했습니다.", 200, userAccountResponseDTO));
    }


    @PatchMapping("/nickname")
    @ApiOperation(value="닉네임 변경")
    @ApiResponses({
            @ApiResponse(code=200, message="닉네임 변경에 성공했습니다."),
            @ApiResponse(code=401, message="권한이 없습니다."),
            @ApiResponse(code=409, message="닉네임 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> changeNickname(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @ApiParam(value="변경할 닉네임", required=true) UserNicknameChangeRequestDTO userNicknameChangeRequestDTO) {
        try {
            Integer statusCode = userService.changeUserNickname(accessToken, userNicknameChangeRequestDTO.getUserNickname());

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("닉네임 변경에 실패했습니다.", 409));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(401).body(BaseResponseDTO.of("권한이 없습니다.", 401));
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
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @ApiParam(value="프로필 이미지", required=true) @RequestPart MultipartFile multipartFile) {
        try {
            userService.uploadProfileImage(accessToken, multipartFile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("회원 정보를 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("프로필 이미지 등록에 실패했습니다.", 409));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("프로필 이미지 등록에 성공했습니다.", 201));
    }

    @GetMapping("/image/{userNickname}")
    @ApiOperation(value="프로필 이미지 불러오기")
    @ApiResponses({
            @ApiResponse(code=200, message="프로필 이미지 주소를 불러왔습니다."),
            @ApiResponse(code=404, message="해당 유저 정보나 프로필 이미지 정보를 찾을 수 없습니다."),
            @ApiResponse(code=409, message="프로필 이미지 주소를 불러오는데에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getProfileImage(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @PathVariable("userNickname") @ApiParam(value="유저 닉네임", required=true) String userNickname) {
        String profileImage = null;

        try {
            profileImage = userService.getProfileImage(accessToken, userNickname);

            UserProfileImageResponseDTO userProfileImageResponseDTO = UserProfileImageResponseDTO.builder().profileImage(profileImage).build();

            return ResponseEntity.status(200).body(UserProfileImageResponseDTO.of("프로필 이미지 주소를 불러왔습니다.", 200, userProfileImageResponseDTO));
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 유저 정보나 프로필 이미지 정보를 찾을 수 없습니다.", 404));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("프로필 이미지 주소를 불러오는데에 실패했습니다.", 409));
        }
    }

    @DeleteMapping()
    @ApiOperation(value="회원 탈퇴")
    @ApiResponses({
            @ApiResponse(code=200, message="회원 탈퇴를 완료했습니다."),
            @ApiResponse(code=409, message="회원 탈퇴에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteUser(
            @ApiIgnore @RequestHeader("Authorization") String accessToken) {
        try {
            userService.deleteUser(accessToken);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("현재 프로필 정보로 된 회원 정보를 찾을 수 없습니다.", 409));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("현재 등록된 이메일 주소로 인증된 정보를 삭제할 수 없습니다.", 409));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("회원 탈퇴를 완료했습니다.", 200));
    }

    @GetMapping("/mypage/community")
    @ApiOperation(value="커뮤니티 글 작성 목록 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="커뮤니티 글 작성 목록을 정상적으로 불러왔습니다."),
            @ApiResponse(code=404, message="조회하려는 정보가 존재하지 않습니다."),
            @ApiResponse(code=409, message="커뮤니티 글 작성 목록을 불러오지 못했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getCommunityHistory(
            @ApiIgnore @RequestHeader("Authorization") String accessToken) {
        UserMyPageCommunityHistoryWrapperResponseDTO communityHistoryWrapperResponseDTO = null;

        try {
            communityHistoryWrapperResponseDTO = userService.getCommunityHistoryList(accessToken);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회하려는 정보가 존재하지 않습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("커뮤니티 글 작성 목록을 불러오지 못했습니다.", 409));
        }

        return ResponseEntity.status(200).body(UserMyPageCommunityHistoryWrapperResponseDTO
                .of("커뮤니티 글 작성 목록을 정상적으로 불러왔습니다.", 200, communityHistoryWrapperResponseDTO));
    }

    @GetMapping("/mypage/epilogue")
    @ApiOperation(value="에필로그 작성 목록 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="에필로그 작성 목록을 정상적으로 불러왔습니다."),
            @ApiResponse(code=404, message="조회하려는 정보가 존재하지 않습니다."),
            @ApiResponse(code=409, message="에필로그 작성 목록을 불러오지 못했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getEpilogueHistory(
            @ApiIgnore @RequestHeader("Authorization") String accessToken) {
        UserMyPageEpilogueHistoryWrapperResponseDTO epilogueHistoryWrapperResponseDTO = null;

        try {
            epilogueHistoryWrapperResponseDTO = userService.getEpilogueHistoryList(accessToken);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회하려는 정보가 존재하지 않습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("에필로그 작성 목록을 불러오지 못했습니다.", 409));
        }

        return ResponseEntity.status(200).body(UserMyPageEpilogueHistoryWrapperResponseDTO
                .of("에필로그 작성 목록을 정상적으로 불러왔습니다.", 200, epilogueHistoryWrapperResponseDTO));
    }

    @GetMapping("/mypage/donation")
    @ApiOperation(value="기부 신청 목록 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="기부 신청 목록을 정상적으로 불러왔습니다."),
            @ApiResponse(code=404, message="조회하려는 정보가 존재하지 않습니다."),
            @ApiResponse(code=409, message="기부 신청 목록을 불러오지 못했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> getDonationHistory(
            @ApiIgnore @RequestHeader("Authorization") String accessToken) {
        UserMyPageDonationHistoryWrapperResponseDTO donationHistoryWrapperResponseDTO = null;

        try {
            donationHistoryWrapperResponseDTO = userService.getDonationHistoryList(accessToken);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회하려는 정보가 존재하지 않습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("기부 신청 목록을 불러오지 못했습니다.", 409));
        }

        return ResponseEntity.status(200).body(UserMyPageDonationHistoryWrapperResponseDTO
                .of("기부 신청 목록을 정상적으로 불러왔습니다.", 200, donationHistoryWrapperResponseDTO));
    }

    @GetMapping("/admin/mypage/donation")
    @ApiOperation(value="미승인 기부 요청 목록 조회")
    @ApiResponses({
            @ApiResponse(code=200, message="미승인 기부 요청 목록을 정상적으로 불러왔습니다."),
            @ApiResponse(code=404, message="미승인 기부 요청 목록이 없습니다."),
            @ApiResponse(code=409, message="관리자가 아니어서 미승인 기부 요청 목록을 불러오지 못했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDTO> getPendingDonationList(
            @ApiIgnore @RequestHeader("Authorization") String accessToken) {
        DonationGetListWrapperResponseDTO donationGetListWrapperResponseDTO = null;

        try {
            donationGetListWrapperResponseDTO = donationService.getPendingDonationList(accessToken);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("미승인 기부 요청 목록이 없습니다.", 404));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("관리자가 아니어서 미승인 기부 요청 목록을 불러오지 못했습니다.", 409));
        }

        return ResponseEntity.ok(DonationGetListWrapperResponseDTO.of("미승인 기부 요청 목록을 정상적으로 불러왔습니다.", 200, donationGetListWrapperResponseDTO));
    }

}
