package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.epilogue.EpilogueChangePatchDTO;
import com.doners.donersbackend.application.dto.request.epilogue.EpilogueRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueCheckResponseDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueResponseDTO;
import com.doners.donersbackend.domain.dao.epilogue.Epilogue;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

public interface EpilogueService {
    @Transactional
    void registerEpilogue(String accessToken, EpilogueRegisterPostDTO epilogueRegisterPostDTO, MultipartFile image);

    Integer changeEpilogue(String epilogueId, EpilogueChangePatchDTO epilogueChangePatchDTO);

    Integer deleteEpilogue(String accessToken, String epilogueId);

    EpilogueGetListWrapperResponseDTO getEpilogueList(String accessToken, int sequence);

    EpilogueResponseDTO getEpilogue(String accessToken, String epilogueId);

    EpilogueCheckResponseDTO checkIfEpilogueExists(String accessToken, String donationId);

    void uploadEpilogueImage(Epilogue epilogue, MultipartFile image);
}
