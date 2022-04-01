package com.doners.donersbackend.domain.dao.epilogue;

import com.doners.donersbackend.domain.dao.BaseEntity;
import com.doners.donersbackend.domain.dao.donation.Donation;
import com.doners.donersbackend.domain.dao.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Epilogue extends BaseEntity {
    @Column(name="epilogue_title")
    private String epilogueTitle;

    @Column(name="epilogue_description")
    @Lob
    private String epilogueDescription;

    @Column(name="epilogue_create_time")
    private LocalDateTime epilogueCreateTime;

    @Column(name="epilogue_views")
    private Long epilogueViews;

    @Column(name="epilogue_is_deleted", columnDefinition="BOOLEAN DEFAULT false")
    private boolean epilogueIsDeleted;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="donation_id")
    private Donation donation;

    // 닉네임 수정
    public void changeEpilogue(String epilogueTitle,String epilogueDescription) {
        this.epilogueTitle = epilogueTitle;
        this.epilogueDescription = epilogueDescription;
    }

    // 글 삭제
    public void deleteEpilogue() {
        if(!this.epilogueIsDeleted) {
            this.epilogueIsDeleted = true;
        }
    }
    // 글 조회
    public void updateViews() {
        this.epilogueViews += 1;
    }
}
