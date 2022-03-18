package com.doners.donersbackend.db.entity.donation;

import com.doners.donersbackend.db.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class File extends BaseEntity {

    @Column(name = "original_file_name")
    private String originalFileName;

    @Column(name = "saved_file_name")
    private String savedFileName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id")
    private Donation donation;

}
