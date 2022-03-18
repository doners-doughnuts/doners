package com.doners.donersbackend.db.entity.donation;

import com.doners.donersbackend.db.entity.BaseEntity;
import com.doners.donersbackend.db.entity.User;
import lombok.*;

import javax.persistence.*;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DonationHistory extends BaseEntity {

    @Column(name = "donation_history_amount")
    private long amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id")
    private Donation donation;

}
