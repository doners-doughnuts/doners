package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.CommunityChangePatchDTO;
import com.doners.donersbackend.application.dto.request.CommunityRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.CommunityGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.CommunityResponseDTO;

public interface CommunityService {
    // 글 작성 : 필수 글 정보 입력 - 제목, 내용
    void communityRegister(CommunityRegisterPostDTO communityRegisterPostDTO);
    // 글 변경
    Integer changeCommunity(String communityId,CommunityChangePatchDTO communityChangePatchDTO);
    // 글 변경
    Integer deleteCommunity(String communityId);
    // 커뮤니티 글 목록 조회
    CommunityGetListWrapperResponseDTO getCommunityList();
    // 커뮤니티 글 목록 조회
    CommunityResponseDTO getCommunity(String communityId);
}
