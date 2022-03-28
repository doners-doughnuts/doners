package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.community.CommunityChangePatchDTO;
import com.doners.donersbackend.application.dto.request.community.CommunityRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityResponseDTO;

public interface CommunityService {
    // 글 등록 : 필수 글 정보 입력 - 제목, 내용, 작성자 , 코드
    void communityRegister(String accessToken, CommunityRegisterPostDTO communityRegisterPostDTO);
    // 글 변경
    Integer changeCommunity(String accessToken, CommunityChangePatchDTO communityChangePatchDTO);
    // 글 변경
    Integer deleteCommunity(String communityId);
    // 커뮤니티 글 목록 조회
    CommunityGetListWrapperResponseDTO getCommunityList(int sequence);
    // 커뮤니티 글 목록 조회
    CommunityResponseDTO getCommunity(String communityId);

    String getUserAccountFromAccessToken(String accessToken);
}
