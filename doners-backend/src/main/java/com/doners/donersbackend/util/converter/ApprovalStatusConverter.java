package com.doners.donersbackend.util.converter;

import com.doners.donersbackend.db.enums.ApprovalStatusCode;

import javax.persistence.Converter;

@Converter(autoApply = true)
public class ApprovalStatusConverter extends AbstractEnumAttributeConverter<ApprovalStatusCode> {

    public static final String ENUM_NAME = "반려 사유";

    public ApprovalStatusConverter() {
        super(ApprovalStatusCode.class, false, ENUM_NAME);
    }

}
