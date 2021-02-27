package de.smiconsulting.smichatbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties()
public class SmiChatBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmiChatBackendApplication.class, args);
	}

}
