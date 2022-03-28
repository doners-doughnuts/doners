package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.community.CommunityChangePatchDTO;
import com.doners.donersbackend.application.dto.request.community.CommunityRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityGetListResponseDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.community.CommunityResponseDTO;
import com.doners.donersbackend.domain.dao.comment.Comment;
import com.doners.donersbackend.domain.dao.community.Community;
import com.doners.donersbackend.domain.dao.user.User;
import com.doners.donersbackend.domain.dao.comment.enums.CommunityCode;
import com.doners.donersbackend.domain.repository.CommentRepository;
import com.doners.donersbackend.domain.repository.CommunityRepository;
import com.doners.donersbackend.domain.repository.UserRepository;
import com.doners.donersbackend.security.util.JwtAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.doners.donersbackend.domain.dao.comment.enums.CommunityCode.GENERAL;
import static com.doners.donersbackend.domain.dao.comment.enums.CommunityCode.NOTICE;

@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService{

    private final CommunityRepository communityRepository;

    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    // 글 등록 : 필수 글 정보 입력 - 제목, 내용, 작성자
    @Override
    public void communityRegister(String accessToken, CommunityRegisterPostDTO communityRegisterPostDTO) {
        String userAccount = getUserAccountFromAccessToken(accessToken);

        User user = userRepository.findByUserAccount(userAccount).get();

        CommunityCode communityCode;
        communityCode = user.getUserCode().getCode().equals("U01") ? NOTICE : GENERAL;

        // 글작성 정보 추가할 것
        Community community = Community.builder()
                .communityTitle(communityRegisterPostDTO.getCommunityTitle())
                .communityDescription(communityRegisterPostDTO.getCommunityDescription())
                .user(user)
                .communityViews(0L)
                .communityCreateTime(LocalDateTime.now())
                .communityCode(communityCode).build();

        communityRepository.save(community);
    }

    @Override
    public Integer changeCommunity(String communityId, CommunityChangePatchDTO communityChangePatchDTO) {
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
    public CommunityGetListWrapperResponseDTO getCommunityList(int sequence) {
        List<Community> communityList = communityRepository.findByCommunityIsDeletedOrderByCommunityCodeAscCommunityCreateTimeDesc(false, PageRequest.of(sequence-1, 10, Sort.Direction.ASC, "communityCode")).orElse(null);

        List<CommunityGetListResponseDTO> communityGetListResponseDTOList = new ArrayList<>();

        communityList.forEach(community -> {
            List<Comment> commentList = commentRepository.findAllByCommunityAndCommentIsDeleted(community, false).orElse(null);
            long comments = commentList == null ? 0L : commentList.size();

            communityGetListResponseDTOList.add(
                    CommunityGetListResponseDTO.builder()
                            .communityId(community.getId())
                            .communityTitle(community.getCommunityTitle())
                            .communityDescription(community.getCommunityDescription())
                            .communityCreateTime(community.getCommunityCreateTime())
                            .communityViews(community.getCommunityViews())
                            .communityWriter(community.getUser().getUserNickname())
                            .communityCode(community.getCommunityCode())
                            .comments(comments)
                            .build()
            );
        });

        return CommunityGetListWrapperResponseDTO.builder()
                .communityGetListResponseDTOList(communityGetListResponseDTOList)
                .build();
    }

    @Override
    public CommunityResponseDTO getCommunity(String communityId) {

        Community community = communityRepository.findByIdAndCommunityIsDeleted(communityId, false)
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

    @Override
    public String getUserAccountFromAccessToken(String accessToken) {
        String token = accessToken.split(" ")[1];
        return jwtAuthenticationProvider.getUserAccount(token);
    }
}
