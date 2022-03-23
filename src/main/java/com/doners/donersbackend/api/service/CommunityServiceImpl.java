package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.CommunityChangePatchDTO;
import com.doners.donersbackend.api.dto.request.CommunityRegisterPostDTO;
import com.doners.donersbackend.api.dto.response.CommunityGetListResponseDTO;
import com.doners.donersbackend.api.dto.response.CommunityGetListWrapperResponseDTO;
import com.doners.donersbackend.api.dto.response.CommunityResponseDTO;
import com.doners.donersbackend.db.entity.Community;
import com.doners.donersbackend.db.repository.CommentRepository;
import com.doners.donersbackend.db.repository.CommunityRepository;
import com.doners.donersbackend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService{

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    // 글 등록 : 필수 글 정보 입력 - 제목, 내용, 작성자
    @Override
    public void communityRegister(CommunityRegisterPostDTO communityRegisterPostDTO) {
        // 글작성 정보 추가할 것
        Community community = Community.builder()
                .communityTitle(communityRegisterPostDTO.getCommunityTitle())
                .communityDescription(communityRegisterPostDTO.getCommunityDescription())
                .user(userRepository.findByUserAccount(communityRegisterPostDTO.getUserAccount()).get())
                .communityCreateTime(LocalDateTime.now()).build();

        communityRepository.save(community);
    }

    @Override
    public Integer changeCommunity(String communityId,CommunityChangePatchDTO communityChangePatchDTO) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new IllegalArgumentException("해당 글을 찾을 수 없습니다."));

        try {
            community.changeCommunity(communityChangePatchDTO.getCommunityTitle(),communityChangePatchDTO.getCommunityDescription());
        } catch(Exception e) {
            return 409;
        }

        communityRepository.save(community);
        return 200;
    }

    @Override
    public Integer deleteCommunity(String communityId) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new IllegalArgumentException("해당 글을 찾을 수 없습니다."));

        try {
            community.deleteCommunity();
        } catch(Exception e) {
            return 409;
        }

        communityRepository.save(community);
        return 200;
    }

    @Override
    public CommunityGetListWrapperResponseDTO getCommunityList() {
        List<Community> communityList = communityRepository.findByCommunityIsDeleted(false).orElse(null);

        List<CommunityGetListResponseDTO> communityGetListResponseDTOList = new ArrayList<>();

        communityList.forEach(community -> {
            communityGetListResponseDTOList.add(
                    CommunityGetListResponseDTO.builder()
                            .communityId(community.getId())
                            .communityTitle(community.getCommunityTitle())
                            .communityDescription(community.getCommunityDescription())
                            .communityCreateTime(community.getCommunityCreateTime())
                            .communityViews(community.getCommunityViews())
                            .communityWriter(community.getUser().getUserNickname())
                            .build()
            );
        });

        return CommunityGetListWrapperResponseDTO.builder()
                .communityGetListResponseDTOList(communityGetListResponseDTOList)
                .build();
    }

    @Override
    public CommunityResponseDTO getCommunity(String communityId) {

        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new IllegalArgumentException("해당 커뮤니티 글을 찾을 수 없습니다."));

        increaseViews(community);
        return CommunityResponseDTO.builder()
                .communityTitle(community.getCommunityTitle())
                .communityDescription(community.getCommunityDescription())
                .communityCreateTime(community.getCommunityCreateTime())
                .communityViews(community.getCommunityViews())
                .communityWriter(community.getUser().getUserNickname())
                .build();
    }

    public void increaseViews(Community community) {
        // 조회수 업데이트
        community.updateViews();

        communityRepository.save(community);
    }
}
