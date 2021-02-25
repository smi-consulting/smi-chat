package de.smiconsulting.smichatbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import de.smiconsulting.smichatbackend.config.EjabberdConfiguration;

@SpringBootApplication
@EnableConfigurationProperties(
		EjabberdConfiguration.class
)
public class SmiChatBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmiChatBackendApplication.class, args);
	}

}
