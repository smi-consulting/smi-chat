package de.smiconsulting.smichatbackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Delegate;

/**
 * @author SMI Consulting
 */
@ConstructorBinding
@ConfigurationProperties(prefix = "smi-chat-backend.ejabberd")
@Getter
@RequiredArgsConstructor
public class EjabberdConfiguration {

    @Delegate
    private final Admin admin;

    @Getter
    @RequiredArgsConstructor
    public static class Admin {
        private final String name;
        private final String password;
    }
}
