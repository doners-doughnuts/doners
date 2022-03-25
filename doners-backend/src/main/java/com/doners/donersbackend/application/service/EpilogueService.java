package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.epilogue.EpilogueChangePatchDTO;
import com.doners.donersbackend.application.dto.request.epilogue.EpilogueRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueResponseDTO;
import com.doners.donersbackend.domain.dao.epilogue.Epilogue;
import org.springframework.web.multipart.MultipartFile;

public interface EpilogueService {
    // 글 등록 : 필수 글 정보 입력 - 제목, 내용, 작성자
    void epilogueRegister(EpilogueRegisterPostDTO epilogueRegisterPostDTO,MultipartFile image);

    Integer changeEpilogue(String epilogueId, EpilogueChangePatchDTO epilogueChangePatchDTO);

    Integer deleteEpilogue(String epilogueId);

    EpilogueGetListWrapperResponseDTO getEpilogueList();

    EpilogueResponseDTO getEpilogue(String epilogueId);

    void uploadDonationFile(Epilogue epilogue, MultipartFile image);
}
