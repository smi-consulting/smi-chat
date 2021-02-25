package de.smiconsulting.smichatbackend.controller.user;

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
public class UserDto {
    private Integer id;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
}
