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
public class RegisterRequest {

    @NotBlank
    private String username;

    @Email
    private String email;

    private String firstname;
    private String lastname;

}
