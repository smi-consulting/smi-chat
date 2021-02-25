package de.smiconsulting.smichatbackend.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import de.smiconsulting.smichatbackend.service.user.User;
import de.smiconsulting.smichatbackend.service.user.UserService;

import lombok.RequiredArgsConstructor;

/**
 * @author Lufthansa Industry Solutions
 */
@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/login")
    public UserDto login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.login(mapToUser(loginRequest));
            return mapToUserDto(user);
        } catch (UserService.UserAlreadyExistsException userAlreadyExistsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Dieser Nutzer existiert bereits!");
        }
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


    private User mapToUser(LoginRequest loginRequest) {
        return User.builder()
                .username(loginRequest.getUsername())
                .email(loginRequest.getEmail())
                .firstname(loginRequest.getFirstname())
                .lastname(loginRequest.getLastname())
                .build();
    }
}
