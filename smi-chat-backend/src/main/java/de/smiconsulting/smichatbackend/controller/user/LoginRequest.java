package de.smiconsulting.smichatbackend.controller.user;

import lombok.Data;

/**
 * @author SMI Consulting
 */
@Data
public class LoginRequest {
    private String username;
    private String email;
    private String firstname;
    private String lastname;
}
