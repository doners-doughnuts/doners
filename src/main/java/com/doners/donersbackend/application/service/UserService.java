package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.user.UserInfoSetRequestDTO;
import com.doners.donersbackend.application.dto.response.user.*;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    // 회원가입 : 필수 회원 정보 입력 - 이름, 이메일, 닉네임
    Integer setUserInfo(UserInfoSetRequestDTO userInfoSetRequestDto);

    UserLoginResponseDTO getUserLoginResponseDTO(String userAccount);

    UserAccountResponseDTO getUserAccountResponseDTO(String accessToken, String userNickname);

    UserNameResponseDTO getUserNameResponseDTO(String accessToken, String userNickname);

    // 닉네임 변경
    Integer changeUserNickname(String accessToken, String userNickname);

    // 닉네임 중복 체크
    // 중복이면 409(불가) , 아니면 200(가능)
    Integer checkNickname(String userNickname);

    void uploadProfileImage(String accessToken, MultipartFile multipartFile);

    void deleteUser(String accessToken);

    String getProfileImage(String accessToken, String userNickname);

    UserMyPageCommunityHistoryWrapperResponseDTO getCommunityHistoryList(String accessToken);

    UserMyPageEpilogueHistoryWrapperResponseDTO getEpilogueHistoryList(String accessToken);

    UserMyPageDonationHistoryWrapperResponseDTO getDonationHistoryList(String accessToken);
}
