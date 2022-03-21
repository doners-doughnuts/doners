package com.doners.donersbackend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix="doners.email.confirmation.server")
@Component
@Setter
@Getter
public class EmailProperties {
    private String domain;
}
