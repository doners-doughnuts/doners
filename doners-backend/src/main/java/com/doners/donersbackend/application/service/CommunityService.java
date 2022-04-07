package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.community.CommunityChangePatchDTO;
import com.doners.donersbackend.application.dto.request.community.CommunityRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityResponseDTO;
import com.doners.donersbackend.domain.dao.user.User;

public interface CommunityService {
    void registerCommunity(String accessToken, CommunityRegisterPostDTO communityRegisterPostDTO);

    Integer changeCommunity(String accessToken, CommunityChangePatchDTO communityChangePatchDTO);

    Integer deleteCommunity(String accessToken, String communityId);

    CommunityGetListWrapperResponseDTO getCommunityList(String accessToken, int sequence);

    CommunityResponseDTO getCommunity(String accessToken, String communityId);
}
