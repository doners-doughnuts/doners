package com.doners.donersbackend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
}
