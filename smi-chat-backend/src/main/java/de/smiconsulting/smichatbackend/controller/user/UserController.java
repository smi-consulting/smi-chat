package de.smiconsulting.smichatbackend.controller.user;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import de.smiconsulting.smichatbackend.service.user.User;
import de.smiconsulting.smichatbackend.service.user.UserService;
import de.smiconsulting.smichatbackend.service.user.UserValidation;

import lombok.RequiredArgsConstructor;

/**
 * @author SMI Consulting
 */
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/register")
    public UserDto register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            User user = userService.registerUser(mapToUser(registerRequest));
            return mapToUserDto(user);
        } catch (UserService.UserAlreadyExistsException userAlreadyExistsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Dieser Nutzer existiert bereits!");
        }
    }

    @PostMapping(value = "/login")
    public UserDto login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.loginUser(mapToUser(loginRequest));
            return mapToUserDto(user);
        } catch (UserService.UserDoesNotExistException userAlreadyExistsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Dieser Nutzer existiert nicht!");
        }
    }

    @PostMapping(value = "/validate")
    public UserDto login(@Valid @RequestBody ValidationRequest validationRequest) {
        try {
            User user = userService.validateUser(mapToUserValidation(validationRequest));
            return mapToUserDto(user);
        } catch (UserService.UserValidationException userValidationException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Fehler bei der Validierung!");
        }
    }

    private UserValidation mapToUserValidation(ValidationRequest validationRequest) {
        return new UserValidation(validationRequest.getEmail(), validationRequest.getValidationCode());
    }

    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .build();
    }


    private User mapToUser(RegisterRequest registerRequest) {
        return User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .firstname(registerRequest.getFirstname())
                .lastname(registerRequest.getLastname())
                .build();
    }

    private User mapToUser(LoginRequest loginRequest) {
        return User.builder()
                .username(loginRequest.getUsername())
                .email(loginRequest.getEmail())
                .build();
    }
}
