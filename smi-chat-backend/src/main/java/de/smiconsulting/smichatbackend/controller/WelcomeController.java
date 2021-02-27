package de.smiconsulting.smichatbackend.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


import lombok.RequiredArgsConstructor;

/**
 * @author SMI Consulting
 */
@Controller
@RequiredArgsConstructor
public class WelcomeController {

    @GetMapping(value = "/welcome", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> welcome() {
        return ResponseEntity.ok("Welcome!");
    }
}
