package com.doners.donersbackend.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Image extends BaseEntity {
    @Column(name="image_origin_file_name")
    private String imageOriginFileName;

    @Column(name="image_new_file_name")
    private String imageNewFileName;

    @Column(name="image_is_resized", columnDefinition="BOOLEAN DEFAULT false")
    private boolean imageIsResized;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

//    @ManyToOne(fetch=FetchType.LAZY)
//    @JoinColumn(name="appreciation_id")
//    private Appreciation appreciation;
//
//    @ManyToOne(fetch=FetchType.LAZY)
//    @JoinColumn(name="donation_id")
//    private Donation donation;

    @Builder
    public Image(String imageOriginFileName, String imageNewFileName, boolean imageIsResized, User user) {
        super();
        this.imageOriginFileName = imageOriginFileName;
        this.imageNewFileName = imageNewFileName;
        this.imageIsResized = imageIsResized;
        this.user = user;
    }

    public void changeImage(String imageOriginFileName, String imageNewFileName) {
        this.imageOriginFileName = imageOriginFileName;
        this.imageNewFileName = imageNewFileName;
    }

    public void changeThumbnailImage(String imageOriginFileName, String imageNewFileName, boolean imageIsResized) {
        this.imageOriginFileName = imageOriginFileName;
        this.imageNewFileName = imageNewFileName;
        this.imageIsResized = imageIsResized;
    }
}
