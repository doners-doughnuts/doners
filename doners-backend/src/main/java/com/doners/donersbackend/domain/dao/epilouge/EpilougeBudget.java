package com.doners.donersbackend.domain.dao.epilouge;

import com.doners.donersbackend.domain.dao.BaseEntity;
import com.doners.donersbackend.domain.dao.epilouge.Epilouge;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class EpilougeBudget extends BaseEntity {
    @Column(name = "epilouge_budget_plan")
    private String epilougeBudgetPlan;

    @Column(name = "epilouge_budget_amount")
    private long epilougeBudgetAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "epilouge_id")
    private Epilouge epilouge;
}
