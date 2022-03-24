package com.doners.donersbackend.domain.dao.epilouge;

import com.doners.donersbackend.domain.dao.BaseEntity;
import com.doners.donersbackend.domain.dao.User;
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
public class Epilouge extends BaseEntity {
    @Column(name="epilouge_title")
    private String epilougeTitle;

    @Column(name="epilouge_description")
    @Lob
    private String epilougeDescription;

    @Column(name="epilouge_create_time")
    private LocalDateTime epilougeCreateTime;

    @Column(name="epilouge_views")
    private Long epilougeViews;

    @Column(name="epilouge_is_deleted", columnDefinition="BOOLEAN DEFAULT false")
    private boolean epilougeIsDeleted;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    // 닉네임 수정
    public void changeEpilouge(String epilougeTitle,String epilougeDescription) {
        this.epilougeTitle = epilougeTitle;
        this.epilougeDescription = epilougeDescription;
    }

    // 글 삭제
    public void deleteEpilouge() {
        if(!this.epilougeIsDeleted) {
            this.epilougeIsDeleted = true;
        }
    }
    // 글 조회
    public void updateViews() {
        this.epilougeViews += 1;
    }
}
