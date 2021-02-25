package de.smiconsulting.smichatbackend.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author SMI Consulting
 */
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsernameOrEmail(String username, String email);
}
