package com.doners.donersbackend.domain.dao.comment.enums;

import lombok.Getter;

@Getter
public enum NotificationCode implements CommonType {

    APPROVAL("N01", "승인 여부"),
    PROGRESS("N02", "종료 여부");

    private final String code;

    private final String description;

    NotificationCode(String code, String description) {
        this.code = code;
        this.description = description;
    }

}
