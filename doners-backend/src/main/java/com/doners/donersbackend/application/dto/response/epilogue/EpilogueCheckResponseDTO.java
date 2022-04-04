package com.doners.donersbackend.application.dto.response.epilogue;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("EpilogueCheckResponseDTO")
@Getter
@ToString
@Builder
public class EpilogueCheckResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name="에필로그 존재 유무")
    private boolean exists;

    public static EpilogueCheckResponseDTO of(String message, Integer statusCode, EpilogueCheckResponseDTO epilogueCheckResponseDTO) {
        epilogueCheckResponseDTO.setMessage(message);
        epilogueCheckResponseDTO.setStatusCode(statusCode);

        return epilogueCheckResponseDTO;
    }
}
