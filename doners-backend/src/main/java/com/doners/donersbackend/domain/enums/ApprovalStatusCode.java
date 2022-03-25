package com.doners.donersbackend.domain.enums;

import lombok.Getter;

@Getter
public enum ApprovalStatusCode implements CommonType {

    BEFORE_CONFIRMATION("A01", "확인 전"),
    APPROVAL("A02", "승인"),
    WRONG_CONTACT_NUM("A03", "신청자 연락처 확인 불가"),
    UNQUALIFIED_DEPUTY("A04", "대리인 자격 부족"),
    DUPLICATION("A05", "기존 기부 내역과 중복"),
    INADEQUATE_PLANNING("A06", "모금 상세 계획 미흡"),
    INSUFFICIENT_REASON("A07", "모금 사유 불충분"),
    LACK_OF_EVIDENCE("A08", "증빙자료 부족"),
    ETC("A09", "기타");

    private final String code;

    private final String description;

    ApprovalStatusCode(String code, String description) {
        this.code = code;
        this.description = description;
    }

}
