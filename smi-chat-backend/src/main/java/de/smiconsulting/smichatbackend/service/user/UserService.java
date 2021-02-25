package de.smiconsulting.smichatbackend.service.user;

import java.util.Optional;

import org.springframework.stereotype.Service;

import de.smiconsulting.smichatbackend.repository.user.UserEntity;
import de.smiconsulting.smichatbackend.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * @author SMI Consulting
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User login(User user) {
        Optional<UserEntity> userEntityOptional = userRepository.findByUsernameOrEmail(user.getUsername(), user.getEmail());

        if (userEntityOptional.isPresent()) {
            throw new UserAlreadyExistsException();
        }

        UserEntity newUserEntity = UserEntity.builder()
                .id(-1)
                .username(user.getUsername())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .build();

        newUserEntity = userRepository.save(newUserEntity);

        return mapToUser(newUserEntity);
    }


    public User mapToUser(UserEntity userEntity) {
        return User.builder()
                .id(userEntity.getId())
                .username(userEntity.getUsername())
                .email(userEntity.getEmail())
                .firstname(userEntity.getFirstname())
                .lastname(userEntity.getLastname())
                .build();
    }

    public static class UserAlreadyExistsException extends RuntimeException {}
}
