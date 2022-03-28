package com.doners.donersbackend.util.converter;

import com.doners.donersbackend.domain.enums.NotificationCode;

import javax.persistence.Converter;

@Converter(autoApply = true)
public class NotificationConverter extends AbstractEnumAttributeConverter<NotificationCode> {

    public static final String ENUM_NAME = "카테고리";

    public NotificationConverter() {
        super(NotificationCode.class, false, ENUM_NAME);
    }

}
