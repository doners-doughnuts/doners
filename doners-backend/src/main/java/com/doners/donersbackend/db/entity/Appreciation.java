package com.doners.donersbackend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import java.sql.Clob;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
}
