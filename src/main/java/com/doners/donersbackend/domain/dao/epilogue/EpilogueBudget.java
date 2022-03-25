package com.doners.donersbackend.domain.dao.epilogue;

import com.doners.donersbackend.domain.dao.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class EpilogueBudget extends BaseEntity {
    @Column(name = "epilouge_budget_plan")
    private String epilougeBudgetPlan;

    @Column(name = "epilouge_budget_amount")
    private long epilougeBudgetAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "epilouge_id")
    private Epilogue epilouge;
}
