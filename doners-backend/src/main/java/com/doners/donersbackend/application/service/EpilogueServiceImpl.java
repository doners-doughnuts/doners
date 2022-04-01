package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.epilogue.EpilogueChangePatchDTO;
import com.doners.donersbackend.application.dto.request.epilogue.EpilogueRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueBudgetResponseDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueGetListResponseDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.epilogue.EpilogueResponseDTO;
import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.image.Image;
import com.doners.donersbackend.domain.dao.epilogue.Epilogue;
import com.doners.donersbackend.domain.dao.epilogue.EpilogueBudget;
import com.doners.donersbackend.domain.dao.user.User;
import com.doners.donersbackend.domain.repository.ImageRepository;
import com.doners.donersbackend.domain.repository.donation.DonationRepository;
import com.doners.donersbackend.domain.repository.epilogue.EpilogueBudgetRepository;
import com.doners.donersbackend.domain.repository.epilogue.EpilogueRepository;
import com.doners.donersbackend.domain.repository.UserRepository;
import com.doners.donersbackend.security.util.JwtAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EpilogueServiceImpl implements EpilogueService {

    private final EpilogueRepository epilogueRepository;

    private final ImageRepository imageRepository;

    private final UserRepository userRepository;

    private final EpilogueBudgetRepository epilogueBudgetRepository;

    private final DonationRepository donationRepository;

    private final AwsS3Service awsS3Service;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;


    // 글 등록 : 필수 글 정보 입력 - 제목, 내용, 작성자
    @Transactional
    @Override
    public void registerEpilogue(String accessToken, EpilogueRegisterPostDTO epilogueRegisterPostDTO, MultipartFile image) {
        String token = getUserAccountFromAccessToken(accessToken);

        User user = userRepository.findByUserAccount(token)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        Donation donation = donationRepository.findById(epilogueRegisterPostDTO.getDonationId()).orElse(null);

        // 글작성 정보 추가할 것
        Epilogue epilogue = Epilogue.builder()
                .epilogueTitle(epilogueRegisterPostDTO.getEpilogueTitle())
                .epilogueDescription(epilogueRegisterPostDTO.getEpilogueDescription())
                .user(user)
                .epilogueViews(0L)
                .epilogueCreateTime(LocalDateTime.now())
                .donation(donation).build();

        epilogueRegisterPostDTO.getEpilogueBudgetRequestDTOList().forEach(epilogueBudgetRequestDTO ->
                epilogueBudgetRepository.save(
                        EpilogueBudget.builder()
                                .epilogueBudgetPlan(epilogueBudgetRequestDTO.getEpilogueBudgetPlan())
                                .epilogueBudgetAmount(epilogueBudgetRequestDTO.getEpilogueBudgetAmount())
                                .epilogueBudgetSequence(epilogueBudgetRequestDTO.getEpilogueBudgetSequence())
                                .epilogue(epilogue)
                                .build()
                )
        );

        epilogueRepository.save(epilogue);
        // 썸네일 이미지 업로드
        uploadEpilogueImage(epilogue, image);
    }

    @Override
    public Integer changeEpilogue(String accessToken, EpilogueChangePatchDTO epilogueChangePatchDTO) {
        String token = getUserAccountFromAccessToken(accessToken);

        User user = userRepository.findByUserAccount(token)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        Epilogue epilogue = epilogueRepository.findById(epilogueChangePatchDTO.getEpilogueId())
                .orElseThrow(() -> new IllegalArgumentException("해당 에필로그를 찾을 수 없습니다."));

        if(!user.getUserAccount().equals(epilogue.getUser().getUserAccount())) {
            return 401;
        }

        try {
            epilogue.changeEpilogue(epilogueChangePatchDTO.getEpilogueTitle(), epilogueChangePatchDTO.getEpilogueDescription());
        } catch(Exception e) {
            return 409;
        }

        epilogueRepository.save(epilogue);
        return 200;
    }

    @Override
    public Integer deleteEpilogue(String accessToken, String epilogueId) {
        String token = getUserAccountFromAccessToken(accessToken);

        User user = userRepository.findByUserAccount(token)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        Epilogue epilogue = epilogueRepository.findByIdAndEpilogueIsDeleted(epilogueId, false)
                .orElseThrow(() -> new IllegalArgumentException("해당 글을 찾을 수 없습니다."));

        if(!user.getUserAccount().equals(epilogue.getUser().getUserAccount())) {
            return 401;
        }

        try {
            epilogue.deleteEpilogue();
        } catch(Exception e) {
            return 409;
        }

        epilogueRepository.save(epilogue);
        return 200;
    }

    @Override
    public EpilogueGetListWrapperResponseDTO getEpilogueList(String accessToken, int sequence) {
        String token = getUserAccountFromAccessToken(accessToken);

        User user = userRepository.findByUserAccount(token)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        List<Epilogue> epilogueList = epilogueRepository.findByEpilogueIsDeletedOrderByEpilogueCreateTimeDesc(false, PageRequest.of(sequence-1, 9, Sort.Direction.DESC, "epilogueCreateTime"))
                .orElseThrow(() -> new IllegalArgumentException("에필로그가 없습니다."));

        List<EpilogueGetListResponseDTO> epilogueGetListResponseDTOList = new ArrayList<>();

        epilogueList.forEach(epilogue -> {
            Image epilogueThumbnailImage = imageRepository.findByEpilogueAndImageIsResized(epilogue, true)
                            .orElseThrow(() -> new IllegalArgumentException("에필로그 썸네일 이미지가 없습니다."));

            epilogueGetListResponseDTOList.add(
                    EpilogueGetListResponseDTO.builder()
                            .epilogueId(epilogue.getId())
                            .epilogueTitle(epilogue.getEpilogueTitle())
                            .epilogueDescription(epilogue.getEpilogueDescription())
                            .epilogueCreateTime(epilogue.getEpilogueCreateTime())
                            .epilogueViews(epilogue.getEpilogueViews())
                            .epilogueWriter(epilogue.getUser().getUserNickname())
                            .epilogueThumbnailImage("https://donersa404.s3.ap-northeast-2.amazonaws.com/" + epilogueThumbnailImage.getImageNewFileName())
                            .build()
            );
        });

        return EpilogueGetListWrapperResponseDTO.builder()
                .epilogueGetListResponseDTOList(epilogueGetListResponseDTOList)
                .build();
    }

    @Override
    public EpilogueResponseDTO getEpilogue(String accessToken, String epilogueId) {
        String token = getUserAccountFromAccessToken(accessToken);

        User user = userRepository.findByUserAccount(token)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        Epilogue epilogue = epilogueRepository.findByIdAndEpilogueIsDeleted(epilogueId, false)
                .orElseThrow(() -> new IllegalArgumentException("해당 에필로그를 찾을 수 없습니다."));

        Image epilogueImage = imageRepository.findByEpilogueAndImageIsResized(epilogue, false)
                .orElseThrow(() -> new IllegalArgumentException("에필로그 이미지를 찾을 수 없습니다."));

        List<EpilogueBudget> epilogueBudgetList = epilogueBudgetRepository.findAllByEpilogue(epilogue)
                .orElse(null); // 사용 내역이 없는 경우
        List<EpilogueBudgetResponseDTO> epilogueBudgetResponseDTOList = new ArrayList<>();

        epilogueBudgetList.forEach(epilogueBudget ->
                epilogueBudgetResponseDTOList.add(
                        EpilogueBudgetResponseDTO.builder()
                                .epilogueBudgetPlan(epilogueBudget.getEpilogueBudgetPlan())
                                .epilogueBudgetAmount(epilogueBudget.getEpilogueBudgetAmount())
                                .epilogueBudgetSequence(epilogueBudget.getEpilogueBudgetSequence())
                                .build()
                )
        );

        increaseViews(epilogue);
        return EpilogueResponseDTO.builder()
                .epilogueTitle(epilogue.getEpilogueTitle())
                .epilogueDescription(epilogue.getEpilogueDescription())
                .epilogueCreateTime(epilogue.getEpilogueCreateTime())
                .epilogueViews(epilogue.getEpilogueViews())
                .epilogueWriter(epilogue.getUser().getUserNickname())
                .epilogueImage("https://donersa404.s3.ap-northeast-2.amazonaws.com/" + epilogueImage.getImageNewFileName())
                .donationId(epilogue.getDonation().getId())
                .epilogueBudgetResponseDTOList(epilogueBudgetResponseDTOList)
                .build();
    }

    @Override
    public void uploadEpilogueImage(Epilogue epilogue, MultipartFile image) {

        if (image != null) {
            String fileName = awsS3Service.uploadImage(image);

            Image img = Image.builder()
                    .imageOriginFileName(image.getOriginalFilename())
                    .imageNewFileName(fileName)
                    .epilogue(epilogue)
                    .build();

            imageRepository.save(img);

            String thumbNailFileName = awsS3Service.uploadThumbnailImage(fileName, image);

            Image thumbNailImg = Image.builder()
                    .imageOriginFileName(image.getOriginalFilename())
                    .imageNewFileName(thumbNailFileName)
                    .imageIsResized(true)
                    .epilogue(epilogue)
                    .build();

            imageRepository.save(thumbNailImg);
        }
    }

    public void increaseViews(Epilogue epilogue) {
        epilogue.updateViews();
        epilogueRepository.save(epilogue);
    }

    @Override
    public String getUserAccountFromAccessToken(String accessToken) {
        String token = accessToken.split(" ")[1];
        return jwtAuthenticationProvider.getUserAccount(token);
    }
}
