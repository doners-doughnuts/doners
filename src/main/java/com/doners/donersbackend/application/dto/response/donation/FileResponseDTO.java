package com.doners.donersbackend.application.dto.response.donation;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("FileResponseDTO")
@Getter
@ToString
public class FileResponseDTO {

    @ApiModelProperty(name = "파일명")
    private String name;

    @ApiModelProperty(name = "주소")
    private String url;

    @Builder
    public FileResponseDTO(String name, String url) {
        this.name = name;
        this.url = url;
    }

}
