package de.smiconsulting.smichatbackend.service.user;

import java.util.Optional;

import org.springframework.stereotype.Service;

import de.smiconsulting.smichatbackend.repository.user.UserEntity;
import de.smiconsulting.smichatbackend.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;

/**
 * @author SMI Consulting
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserEmailService userEmailService;

    public User registerUser(User user) {
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
                .validated(false)
                .validationCode(RandomString.make(6).toUpperCase())
                .build();

        newUserEntity = userRepository.save(newUserEntity);

        userEmailService.sendRegisterEmail(newUserEntity);

        return mapToUser(newUserEntity);
    }

    public User loginUser(User user) {
        Optional<UserEntity> userEntityOptional = userRepository.findByUsernameAndEmailAndValidated(user.getUsername(), user.getEmail(), true);

        if (userEntityOptional.isEmpty()) {
            throw new UserDoesNotExistException();
        }

        return mapToUser(userEntityOptional.get());
    }

    public User validateUser(UserValidation userValidation) {
        Optional<UserEntity> userEntityOptional = userRepository.findByEmailAndValidationCodeAndValidated(userValidation.getEmail(), userValidation.getValidationCode(), false);

        if (userEntityOptional.isEmpty()) {
            throw new UserValidationException();
        }

        // set Validated true
        UserEntity userEntity = userEntityOptional.get();
        userEntity.setValidated(true);
        userEntity = userRepository.save(userEntity);

        return mapToUser(userEntity);
    }

    private User mapToUser(UserEntity userEntity) {
        return User.builder()
                .id(userEntity.getId())
                .username(userEntity.getUsername())
                .email(userEntity.getEmail())
                .firstname(userEntity.getFirstname())
                .lastname(userEntity.getLastname())
                .build();
    }

    public static class UserAlreadyExistsException extends RuntimeException {
    }

    public static class UserDoesNotExistException extends RuntimeException {
    }

    public class UserValidationException extends RuntimeException {
    }
}
