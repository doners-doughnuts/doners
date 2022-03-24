package com.doners.donersbackend.application.dto.request;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

@ApiModel("EpilougeRegisterPostDTO")
@NoArgsConstructor
@Getter
public class EpilougeRegisterPostDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name="글 제목")
    private String epilougeTitle;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="글 내용")
    private String epilougeDescription;

    @NotBlank
    @NotNull
    @ApiModelProperty(name="작성자 유저 주소")
    private String userAccount;

    @ApiModelProperty(name = "모금액 활용 계획")
    private List<EpilougeBudgetRequestDTO> epilougeBudgetRequestDTOList;
}
