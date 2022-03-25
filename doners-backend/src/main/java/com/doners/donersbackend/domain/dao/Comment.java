package com.doners.donersbackend.domain.dao;

import com.doners.donersbackend.domain.dao.epilogue.Epilogue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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

    @OneToMany(mappedBy = "parentCommentId", orphanRemoval = true)
    private List<Comment> children;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="community_id")
    private Community community;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="epilouge_id")
    private Epilogue epilouge;

    // 댓글 수정
    public void changeComment(String commentDescription) {
        this.commentDescription = commentDescription;
    }
    // 커뮤니티 아이디 수정
    public void changeCommunityId(Community community) {
        this.community = community;
    }

    // 감사 글 아이디 수정
    public void changeEpilougeId(Epilogue epilouge) {
        this.epilouge = epilouge;
    }

    // 댓글 삭제
    public void deleteComment() {
        if(!this.commentIsDeleted) {
            this.commentIsDeleted = true;
        }
    }
}
