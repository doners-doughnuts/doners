package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.request.EpilougeChangePatchDTO;
import com.doners.donersbackend.api.dto.request.EpilougeRegisterPostDTO;
import com.doners.donersbackend.api.dto.response.*;
import com.doners.donersbackend.db.entity.Epilouge;
import com.doners.donersbackend.db.entity.EpilougeBudget;
import com.doners.donersbackend.db.repository.EpilougeBudgetRepository;
import com.doners.donersbackend.db.repository.EpilougeRepository;
import com.doners.donersbackend.db.repository.CommentRepository;
import com.doners.donersbackend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EpilougeServiceImpl implements EpilougeService {

    private final EpilougeRepository epilougeRepository;
    private final EpilougeBudgetRepository epilougeBudgetRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    // 글 등록 : 필수 글 정보 입력 - 제목, 내용, 작성자
    @Override
    public void epilougeRegister(EpilougeRegisterPostDTO epilougeRegisterPostDTO) {
        // 글작성 정보 추가할 것
        Epilouge epilouge = Epilouge.builder()
                .epilougeTitle(epilougeRegisterPostDTO.getEpilougeTitle())
                .epilougeDescription(epilougeRegisterPostDTO.getEpilougeDescription())
                .user(userRepository.findByUserAccount(epilougeRegisterPostDTO.getUserAccount()).get())
                .epilougeCreateTime(LocalDateTime.now()).build();

        // 활동 내역 추가
        epilougeRegisterPostDTO.getEpilougeBudgetRequestDTOList().forEach(epilougeBudgetRequestDTO ->
                epilougeBudgetRepository.save(
                        EpilougeBudget.builder()
                                .epilougeBudgetPlan(epilougeBudgetRequestDTO.getEpilougeBudgetPlan())
                                .epilougeBudgetAmount(epilougeBudgetRequestDTO.getEpilougeBudgetAmount())
                                .epilouge(epilouge)
                                .build()
                )
        );
        epilougeRepository.save(epilouge);
    }

    @Override
    public Integer changeEpilouge(String epilougeId, EpilougeChangePatchDTO epilougeChangePatchDTO) {
        Epilouge epilouge = epilougeRepository.findById(epilougeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 글을 찾을 수 없습니다."));

        try {
            epilouge.changeEpilouge(epilougeChangePatchDTO.getEpilougeTitle(),epilougeChangePatchDTO.getEpilougeDescription());
        } catch(Exception e) {
            return 409;
        }

        epilougeRepository.save(epilouge);
        return 200;
    }

    @Override
    public Integer deleteEpilouge(String epilougeId) {
        Epilouge epilouge = epilougeRepository.findById(epilougeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 글을 찾을 수 없습니다."));

        try {
            epilouge.deleteEpilouge();
        } catch(Exception e) {
            return 409;
        }

        epilougeRepository.save(epilouge);
        return 200;
    }

    @Override
    public EpilougeGetListWrapperResponseDTO getEpilougeList() {
        List<Epilouge> epilougeList = epilougeRepository.findByEpilougeIsDeleted(false).orElse(null);

        List<EpilougeGetListResponseDTO> epilougeGetListResponseDTOList = new ArrayList<>();

        epilougeList.forEach(epilouge -> {
            epilougeGetListResponseDTOList.add(
                    EpilougeGetListResponseDTO.builder()
                            .epilougeId(epilouge.getId())
                            .epilougeTitle(epilouge.getEpilougeTitle())
                            .epilougeDescription(epilouge.getEpilougeDescription())
                            .epilougeCreateTime(epilouge.getEpilougeCreateTime())
                            .epilougeViews(epilouge.getEpilougeViews())
                            .epilougeWriter(epilouge.getUser().getUserNickname())
                            .build()
            );
        });

        return EpilougeGetListWrapperResponseDTO.builder()
                .epilougeGetListResponseDTOList(epilougeGetListResponseDTOList)
                .build();
    }

    @Override
    public EpilougeResponseDTO getEpilouge(String epilougeId) {
        Epilouge epilouge = epilougeRepository.findById(epilougeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 감사 글을 찾을 수 없습니다."));

        List<EpilougeBudget> epilougeBudgetList = epilougeBudgetRepository.findAllByEpilouge(epilouge)
                .orElse(null); // 사용 내역이 없는 경우
        List<EpilougeBudgetResponseDTO> epilougeBudgetResponseDTOList = new ArrayList<>();

        epilougeBudgetList.forEach(epilougeBudget ->
                epilougeBudgetResponseDTOList.add(
                        EpilougeBudgetResponseDTO.builder()
                                .epilougeBudgetPlan(epilougeBudget.getEpilougeBudgetPlan())
                                .epilougeBudgetAmount(epilougeBudget.getEpilougeBudgetAmount())
                                .build()
                )
        );

        increaseViews(epilouge);
        return EpilougeResponseDTO.builder()
                .epilougeTitle(epilouge.getEpilougeTitle())
                .epilougeDescription(epilouge.getEpilougeDescription())
                .epilougeCreateTime(epilouge.getEpilougeCreateTime())
                .epilougeViews(epilouge.getEpilougeViews())
                .epilougeWriter(epilouge.getUser().getUserNickname())
                .build();
    }
    
    public void increaseViews(Epilouge epilouge) {
        // 조회수 업데이트
        epilouge.updateViews();

        epilougeRepository.save(epilouge);
    }
}
