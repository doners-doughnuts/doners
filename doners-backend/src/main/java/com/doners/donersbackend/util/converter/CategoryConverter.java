package com.doners.donersbackend.util.converter;

import com.doners.donersbackend.db.enums.CategoryCode;

import javax.persistence.Converter;

@Converter(autoApply = true)
public class CategoryConverter extends AbstractEnumAttributeConverter<CategoryCode> {

    public static final String ENUM_NAME = "카테고리";

    public CategoryConverter() {
        super(CategoryCode.class, false, ENUM_NAME);
    }

}
