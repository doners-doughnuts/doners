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
    @Column(name = "epilogue_budget_plan")
    private String epilogueBudgetPlan;

    @Column(name = "epilogue_budget_amount")
    private long epilogueBudgetAmount;

    @Column(name = "epilogue_budget_sequence")
    private long epilogueBudgetSequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "epilogue_id")
    private Epilogue epilogue;
}
