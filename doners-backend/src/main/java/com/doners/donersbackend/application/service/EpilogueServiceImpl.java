package com.doners.donersbackend.application.service;

import com.doners.donersbackend.application.dto.request.EpilogueChangePatchDTO;
import com.doners.donersbackend.application.dto.request.EpilogueRegisterPostDTO;
import com.doners.donersbackend.application.dto.response.EpilogueBudgetResponseDTO;
import com.doners.donersbackend.application.dto.response.EpilogueGetListResponseDTO;
import com.doners.donersbackend.application.dto.response.EpilogueGetListWrapperResponseDTO;
import com.doners.donersbackend.application.dto.response.EpilogueResponseDTO;
import com.doners.donersbackend.domain.dao.Image;
import com.doners.donersbackend.domain.dao.epilogue.Epilogue;
import com.doners.donersbackend.domain.dao.epilogue.EpilogueBudget;
import com.doners.donersbackend.domain.repository.ImageRepository;
import com.doners.donersbackend.domain.repository.epilogue.EpilogueBudgetRepository;
import com.doners.donersbackend.domain.repository.epilogue.EpilogueRepository;
import com.doners.donersbackend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
    private final EpilogueBudgetRepository epilogueBudgetRepository;
    private final AwsS3Service awsS3Service;
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    // 글 등록 : 필수 글 정보 입력 - 제목, 내용, 작성자
    @Transactional
    @Override
    public void epilogueRegister(EpilogueRegisterPostDTO epilogueRegisterPostDTO,MultipartFile image) {
        // 글작성 정보 추가할 것
        Epilogue epilogue = Epilogue.builder()
                .epilougeTitle(epilogueRegisterPostDTO.getEpilougeTitle())
                .epilougeDescription(epilogueRegisterPostDTO.getEpilougeDescription())
                .user(userRepository.findByUserAccount(epilogueRegisterPostDTO.getUserAccount()).
                        orElseThrow(()->new IllegalArgumentException("해당 사용자를 찾을 수 없습니다.")))
                .epilougeCreateTime(LocalDateTime.now()).build();

        // 활동 내역 추가
        epilogueRegisterPostDTO.getEpilougeBudgetRequestDTOList().forEach(epilogueBudgetRequestDTO ->
                epilogueBudgetRepository.save(
                        EpilogueBudget.builder()
                                .epilougeBudgetPlan(epilogueBudgetRequestDTO.getEpilougeBudgetPlan())
                                .epilougeBudgetAmount(epilogueBudgetRequestDTO.getEpilougeBudgetAmount())
                                .epilouge(epilogue)
                                .build()
                )
        );
        epilogueRepository.save(epilogue);
        // 썸네일 이미지 업로드
        uploadDonationFile(epilogue, image);
    }

    @Override
    public Integer changeEpilogue(String epilogueId, EpilogueChangePatchDTO epilogueChangePatchDTO) {
        Epilogue epilogue = epilogueRepository.findById(epilogueId)
                .orElseThrow(() -> new IllegalArgumentException("해당 글을 찾을 수 없습니다."));

        try {
            epilogue.changeEpilouge(epilogueChangePatchDTO.getEpilougeTitle(),epilogueChangePatchDTO.getEpilougeDescription());
        } catch(Exception e) {
            return 409;
        }

        epilogueRepository.save(epilogue);
        return 200;
    }

    @Override
    public Integer deleteEpilogue(String epilogueId) {
        Epilogue epilogue = epilogueRepository.findById(epilogueId)
                .orElseThrow(() -> new IllegalArgumentException("해당 글을 찾을 수 없습니다."));

        try {
            epilogue.deleteEpilouge();
        } catch(Exception e) {
            return 409;
        }

        epilogueRepository.save(epilogue);
        return 200;
    }

    @Override
    public EpilogueGetListWrapperResponseDTO getEpilogueList() {
        List<Epilogue> epilogueList = epilogueRepository.findByEpilogueIsDeleted(false).orElse(null);

        List<EpilogueGetListResponseDTO> epilogueGetListResponseDTOList = new ArrayList<>();

        epilogueList.forEach(epilogue -> {
            epilogueGetListResponseDTOList.add(
                    EpilogueGetListResponseDTO.builder()
                            .epilougeId(epilogue.getId())
                            .epilougeTitle(epilogue.getEpilougeTitle())
                            .epilougeDescription(epilogue.getEpilougeDescription())
                            .epilougeCreateTime(epilogue.getEpilougeCreateTime())
                            .epilougeViews(epilogue.getEpilougeViews())
                            .epilougeWriter(epilogue.getUser().getUserNickname())
                            .build()
            );
        });

        return EpilogueGetListWrapperResponseDTO.builder()
                .epilougeGetListResponseDTOList(epilogueGetListResponseDTOList)
                .build();
    }

    @Override
    public EpilogueResponseDTO getEpilogue(String epilogueId) {
        Epilogue epilogue = epilogueRepository.findById(epilogueId)
                .orElseThrow(() -> new IllegalArgumentException("해당 감사 글을 찾을 수 없습니다."));

        List<EpilogueBudget> epilogueBudgetList = epilogueBudgetRepository.findAllByEpilogue(epilogue)
                .orElse(null); // 사용 내역이 없는 경우
        List<EpilogueBudgetResponseDTO> epilogueBudgetResponseDTOList = new ArrayList<>();

        epilogueBudgetList.forEach(epilogueBudget ->
                epilogueBudgetResponseDTOList.add(
                        EpilogueBudgetResponseDTO.builder()
                                .epilougeBudgetPlan(epilogueBudget.getEpilougeBudgetPlan())
                                .epilougeBudgetAmount(epilogueBudget.getEpilougeBudgetAmount())
                                .build()
                )
        );

        increaseViews(epilogue);
        return EpilogueResponseDTO.builder()
                .epilougeTitle(epilogue.getEpilougeTitle())
                .epilougeDescription(epilogue.getEpilougeDescription())
                .epilougeCreateTime(epilogue.getEpilougeCreateTime())
                .epilougeViews(epilogue.getEpilougeViews())
                .epilougeWriter(epilogue.getUser().getUserNickname())
                .build();
    }

    @Override
    public void uploadDonationFile(Epilogue epilogue, MultipartFile image) {
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
        // 조회수 업데이트
        epilogue.updateViews();

        epilogueRepository.save(epilogue);
    }
}
