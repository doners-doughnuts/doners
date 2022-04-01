package com.doners.donersbackend.application.dto.request.donation;

import com.doners.donersbackend.domain.enums.CategoryCode;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@ApiModel("DonationInfoRequestDTO")
@Getter
@ToString
@NoArgsConstructor
public class DonationInfoRequestDTO {

    @ApiModelProperty(name = "본인 / 대리인 전화번호")
    @NotBlank
    private String phone;

    @ApiModelProperty(name = "대리인 여부")
    @NotNull
    private boolean deputy;

    @ApiModelProperty(name = "대상자 이름")
    private String beneficiaryName;

    @ApiModelProperty(name = "대상자 전화번호")
    private String beneficiaryPhone;

    @ApiModelProperty(name = "제목")
    @NotBlank
    private String title;

    @ApiModelProperty(name = "카테고리 코드")
    @NotNull
    private CategoryCode categoryCode;

    @ApiModelProperty(name = "마감일")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @ApiModelProperty(name = "사연")
    @NotBlank
    private String description;

    @ApiModelProperty(name = "모금액 활용 계획")
    @NotEmpty
    private List<DonationBudgetRequestDTO> budget;

    @ApiModelProperty(name = "목표 모금액")
    @Positive
    private double targetAmount;

}

