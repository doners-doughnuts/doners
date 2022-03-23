package com.doners.donersbackend.util.converter;

import com.doners.donersbackend.db.enums.CommonType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.AttributeConverter;

// 공통 컨버터
@Getter
@AllArgsConstructor
public class AbstractEnumAttributeConverter<E extends Enum<E> & CommonType> implements AttributeConverter<E, String> {

    // 대상 Enum 클래스의 Class 객체
    private Class<E> targetEnumClass;

    // null 허용 여부
    private boolean nullable;

    // 로그 및 에러 메시지를 위한 Enum Name
    private String enumName;

    // ENUM 의 Code 를 DB 에 저장
    @Override
    public String convertToDatabaseColumn(E attribute) {

        if (!nullable && attribute == null) {
            throw new IllegalArgumentException(String.format("%s(은)는 NULL 로 저장할 수 없습니다.", enumName));
        }

        // Enum -> Code
        return EnumValueConvertUtils.toCode(attribute);

    }

    // DB 저장된 데이터로 ENUM 찾아서 반환
    @Override
    public E convertToEntityAttribute(String dbData) {

        if (!nullable && StringUtils.isBlank(dbData)) {
            throw new IllegalArgumentException(String.format("%s(이)가 DB 에 NUll 혹은 Empty 로 (%s) 저장되어 있습니다.", enumName, dbData));
        }

        // Code -> Enum
        return EnumValueConvertUtils.ofCode(targetEnumClass, dbData);

    }
}
