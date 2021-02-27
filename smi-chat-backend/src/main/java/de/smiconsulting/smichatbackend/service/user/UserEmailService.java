package de.smiconsulting.smichatbackend.service.user;

import java.text.MessageFormat;

import org.springframework.stereotype.Service;

import de.smiconsulting.smichatbackend.email.EmailService;
import de.smiconsulting.smichatbackend.repository.user.UserEntity;

import lombok.RequiredArgsConstructor;

/**
 * @author SMI Consulting
 */
@Service
@RequiredArgsConstructor
public class UserEmailService {

    private static final String WELCOME_TEMPLATE = "<h2>Willkommen zu SMI-Chat {0}!</h2>" +
            "<span>Nutze den Validierungscode:</span>" +
            "<h3>{1}</h3>" +
            "<a href=\"https://chat.smiconsulting.de/validate\">https://chat.smiconsulting.de/validate</a>";

    private final EmailService emailService;

    public void sendRegisterEmail(UserEntity userEntity) {
        String htmlText = MessageFormat.format(WELCOME_TEMPLATE, userEntity.getUsername(), userEntity.getValidationCode());
        emailService.sendMessage(userEntity.getEmail(), "Willkommen zu SMI-Chat!", htmlText);
    }
}
