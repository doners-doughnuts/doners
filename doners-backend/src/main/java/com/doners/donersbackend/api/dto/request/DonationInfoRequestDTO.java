package com.doners.donersbackend.api.dto.request;

import com.doners.donersbackend.db.enums.CategoryCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

@ApiModel("DonationInfoRequestDTO")
@Getter
@ToString
@NoArgsConstructor
public class DonationInfoRequestDTO {

    @NotBlank
    @ApiModelProperty(name = "회원 ID")
    private String userId;

    @NotBlank
    @ApiModelProperty(name = "본인 / 대리인 전화번호")
    private String phone;

    @NotNull
    @ApiModelProperty(name = "대리인 여부")
    private boolean deputy;

    @ApiModelProperty(name = "대상자 이름")
    private String beneficiaryName;

    @ApiModelProperty(name = "대상자 전화번호")
    private String beneficiaryPhone;

    @NotBlank
    @ApiModelProperty(name = "제목")
    private String title;

    @NotNull
    @ApiModelProperty(name = "카테고리")
    private CategoryCode categoryCode;

    @Future
    @ApiModelProperty(name = "마감일")
    private LocalDateTime endTime;

    @NotBlank
    @ApiModelProperty(name = "사연")
    private String description;

    @NotEmpty
    @ApiModelProperty(name = "모금액 활용 계획")
    private List<DonationBudgetRequestDTO> budget;

    @Positive
    @ApiModelProperty(name = "목표 모금액")
    private long targetAmount;

}

