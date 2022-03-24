package com.doners.donersbackend.domain.enums;

import lombok.Getter;

import java.util.Collections;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
public enum CategoryCode implements CommonType {

    COVID_19("C01", "코로나 19"),
    RARE_DISEASE("C02", "희귀 질환"),
    SINGLE_MOM_DAD("C03", "미혼모/미혼부"),
    WAR_VETERAN("C04", "참전 용사");

    private final String code;

    private final String description;

    CategoryCode(String code, String description) {
        this.code = code;
        this.description = description;
    }

    private static final Map<String, CategoryCode> BY_CODE =
            Collections.unmodifiableMap(
                    Stream.of(values())
                            .collect(Collectors.toMap(CategoryCode::getCode, Function.identity()))
            );

//    private static final Map<String, CategoryCode> BY_DESCRIPTION =
//            Collections.unmodifiableMap(
//                    Stream.of(values())
//                            .collect(Collectors.toMap(CategoryCode::getDescription, Function.identity()))
//            );

    // 코드를 통해 Enum 찾기
    public static CategoryCode ofCode(String code) {
        return Optional.ofNullable(BY_CODE.get(code))
                .orElseThrow(NoSuchElementException::new);
    }

//    // 설명을 통해 Enum 찾기
//    public static CategoryCode ofDescription(String description) {
//        return Optional.ofNullable(BY_DESCRIPTION.get(description))
//                .orElseThrow(NoSuchElementException::new);
//    }

}
