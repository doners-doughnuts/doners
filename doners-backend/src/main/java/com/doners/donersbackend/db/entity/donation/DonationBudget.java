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
public class DonationBudget extends BaseEntity {

    @Column(name = "donation_budget_plan")
    private String plan;

    @Column(name = "donation_budget_amount")
    private long amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id")
    private Donation donation;

}
