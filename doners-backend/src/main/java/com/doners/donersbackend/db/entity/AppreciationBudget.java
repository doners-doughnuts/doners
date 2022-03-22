package com.doners.donersbackend.db.entity;

import com.doners.donersbackend.db.entity.donation.Donation;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class AppreciationBudget extends BaseEntity{
    @Column(name = "appreciation_budget_plan")
    private String appreciationBudgetPlan;

    @Column(name = "appreciation_budget_amount")
    private long appreciationBudgetAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appreciation_id")
    private Appreciation appreciation;
}
