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
public class Comment extends BaseEntity {
    @Column(name="comment_description")
    @Lob
    private String commentDescription;

    @Column(name="comment_create_time")
    private LocalDateTime commentCreateTime;

    @Column(name="comment_is_deleted", columnDefinition="BOOLEAN DEFAULT false")
    private boolean commentIsDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private Comment parentCommentId;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="community_id")
    private Community community;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="appreciation_id")
    private Appreciation appreciation;

    // 댓글 수정
    public void changeComment(String commentDescription) {
        this.commentDescription = commentDescription;
    }
    // 커뮤니티 아이디 수정
    public void changeCommunityId(Community community) {
        this.community = community;
    }

    // 감사 글 아이디 수정
    public void changeAppreciationId(Appreciation appreciation) {
        this.appreciation = appreciation;
    }

    // 댓글 삭제
    public void deleteComment() {
        if(!this.commentIsDeleted) {
            this.commentIsDeleted = true;
        }
    }
}