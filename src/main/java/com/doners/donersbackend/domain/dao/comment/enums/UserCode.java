package com.doners.donersbackend.domain.dao.comment.enums;

import lombok.Getter;

@Getter
public enum UserCode implements CommonType {

    ADMIN("U01", "관리자"),
    USER("U02", "사용자");

    private String code;

    private String description;

    UserCode(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
