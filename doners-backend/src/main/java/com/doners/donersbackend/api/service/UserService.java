package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.UserInfoPostDTO;

public interface UserService {

    // 회원가입 : 필수 회원 정보 입력 - 이름, 이메일, 닉네임
    void setUserInfo(UserInfoPostDTO userInfoPostDto);
    // 닉네임 변경
    Integer changeUserNickname(String userNickname);

    // 닉네임 중복 체크
    // 중복이면 409(불가) , 아니면 200(가능)
    Integer checkNickname(String userNickname);
}
