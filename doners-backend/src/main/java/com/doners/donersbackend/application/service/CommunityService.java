package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.community.CommunityChangePatchDTO;
import com.doners.donersbackend.application.dto.request.community.CommunityRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityResponseDTO;
import com.doners.donersbackend.domain.dao.user.User;

public interface CommunityService {
    // 글 등록 : 필수 글 정보 입력 - 제목, 내용, 작성자 , 코드
    void communityRegister(String accessToken, CommunityRegisterPostDTO communityRegisterPostDTO);
    // 글 변경
    Integer changeCommunity(String accessToken, CommunityChangePatchDTO communityChangePatchDTO);

    Integer deleteCommunity(String accessToken, String communityId);

    CommunityGetListWrapperResponseDTO getCommunityList(String accessToken, int sequence);

    CommunityResponseDTO getCommunity(String accessToken, String communityId);

    User getUserFromAccessToken(String accessToken);
}
