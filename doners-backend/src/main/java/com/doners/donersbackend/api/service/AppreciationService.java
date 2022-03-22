package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.AppreciationChangePatchDTO;
import com.doners.donersbackend.api.dto.request.AppreciationRegisterPostDTO;
import com.doners.donersbackend.api.dto.response.AppreciationGetListWrapperResponseDTO;
import com.doners.donersbackend.api.dto.response.AppreciationResponseDTO;
import com.doners.donersbackend.api.dto.response.CommunityResponseDTO;

public interface AppreciationService {
    // 글 작성 : 필수 글 정보 입력 - 제목, 내용
    void appreciationRegister(AppreciationRegisterPostDTO appreciationRegisterPostDTO);
    // 글 변경
    Integer changeAppreciation(String appreciationId, AppreciationChangePatchDTO appreciationChangePatchDTO);
    // 글 변경
    Integer deleteAppreciation(String appreciationId);
    // 감사 글 목록 조회
    AppreciationGetListWrapperResponseDTO getAppreciationList();
    // 커뮤니티 글 목록 조회
    AppreciationResponseDTO getAppreciation(String appreciationId);
}
