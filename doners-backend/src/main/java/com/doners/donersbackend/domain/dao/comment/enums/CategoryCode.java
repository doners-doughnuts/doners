package com.doners.donersbackend.domain.dao.comment.enums;

import lombok.Getter;

@Getter
public enum CategoryCode implements CommonType {

    COVID19("C01", "코로나 19"),
    SINGLE("C02", "희귀 질환"),
    WARRIOR("C03", "미혼모/미혼부"),
    PATIENT("C04", "참전 용사");

    private final String code;

    private final String description;

    CategoryCode(String code, String description) {
        this.code = code;
        this.description = description;
    }

}
