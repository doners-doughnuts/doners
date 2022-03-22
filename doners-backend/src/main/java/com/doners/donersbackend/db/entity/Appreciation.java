package com.doners.donersbackend.db.entity;

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
public class Appreciation extends BaseEntity {
    @Column(name="appreciation_title")
    private String appreciationTitle;

    @Column(name="appreciation_description")
    @Lob
    private String appreciationDescription;

    @Column(name="appreciation_create_time")
    private LocalDateTime appreciationCreateTime;

    @Column(name="appreciation_views")
    private Long appreciationViews;

    @Column(name="appreciation_is_deleted", columnDefinition="BOOLEAN DEFAULT false")
    private boolean appreciationIsDeleted;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    // 닉네임 수정
    public void changeAppreciation(String appreciationTitle,String appreciationDescription) {
        this.appreciationTitle = appreciationTitle;
        this.appreciationDescription = appreciationDescription;
    }

    // 글 삭제
    public void deleteAppreciation() {
        if(!this.appreciationIsDeleted) {
            this.appreciationIsDeleted = true;
        }
    }
    // 글 조회
    public void updateViews() {
        this.appreciationViews += 1;
    }
}
