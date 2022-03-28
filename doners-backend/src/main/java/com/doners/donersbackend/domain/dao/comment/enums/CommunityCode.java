package com.doners.donersbackend.domain.dao.comment.enums;

import lombok.Getter;

@Getter
public enum CommunityCode implements CommonType {

    NOTICE("M01", "공지"),
    GENERAL("M02", "일반");

    private final String code;

    private final String description;

    CommunityCode(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
