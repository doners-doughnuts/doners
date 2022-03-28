package com.doners.donersbackend.util.converter;

import com.doners.donersbackend.domain.dao.comment.enums.CommunityCode;

import javax.persistence.Converter;

@Converter(autoApply = true)
public class CommunityConverter extends AbstractEnumAttributeConverter<CommunityCode> {

    public static final String ENUM_NAME = "커뮤니티";

    public CommunityConverter() {
        super(CommunityCode.class, false, ENUM_NAME);
    }

}
