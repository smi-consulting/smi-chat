package de.smiconsulting.smichatbackend.service.user;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author SMI Consulting
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
}
