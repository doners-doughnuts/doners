package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.EpilougeChangePatchDTO;
import com.doners.donersbackend.api.dto.request.EpilougeRegisterPostDTO;
import com.doners.donersbackend.api.dto.response.EpilougeGetListWrapperResponseDTO;
import com.doners.donersbackend.api.dto.response.EpilougeResponseDTO;

public interface EpilougeService {
    // 글 등록 : 필수 글 정보 입력 - 제목, 내용, 작성자
    void epilougeRegister(EpilougeRegisterPostDTO epilougeRegisterPostDTO);

    Integer changeEpilouge(String epilougeId, EpilougeChangePatchDTO epilougeChangePatchDTO);

    Integer deleteEpilouge(String epilougeId);

    EpilougeGetListWrapperResponseDTO getEpilougeList();

    EpilougeResponseDTO getEpilouge(String epilougeId);
}
