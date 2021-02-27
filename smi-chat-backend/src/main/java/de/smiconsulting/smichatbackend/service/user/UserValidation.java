package de.smiconsulting.smichatbackend.service.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author SMI Consulting
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserValidation {
    private String email;
    private String validationCode;
}
