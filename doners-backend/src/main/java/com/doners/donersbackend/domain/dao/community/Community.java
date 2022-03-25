package com.doners.donersbackend.domain.dao.community;

import com.doners.donersbackend.domain.dao.BaseEntity;
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
public class Community extends BaseEntity {
    @Column(name="community_title")
    private String communityTitle;

    @Column(name="community_description")
    @Lob
    private String communityDescription;

    @Column(name="community_create_time")
    private LocalDateTime communityCreateTime;

    @Column(name="community_views")
    private Long communityViews;

    @Column(name="community_is_deleted", columnDefinition="BOOLEAN DEFAULT false")
    private boolean communityIsDeleted;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    // 닉네임 수정
    public void changeCommunity(String communityTitle,String communityDescription) {
        this.communityTitle = communityTitle;
        this.communityDescription = communityDescription;
    }

    // 글 삭제
    public void deleteCommunity() {
        if(!this.communityIsDeleted) {
            this.communityIsDeleted = true;
        }
    }
    // 글 조회
    public void updateViews() {
        this.communityViews += 1;
    }
}
