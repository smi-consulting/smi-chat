package de.smiconsulting.smichatbackend.controller.user;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

/**
 * @author SMI Consulting
 */
@Data
@Valid
public class ValidationRequest {
    @Email
    private String email;

    @NotBlank
    private String validationCode;
}
