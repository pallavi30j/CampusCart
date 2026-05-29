package com.pallavi.campuscart.controller;

import com.pallavi.campuscart.dto.LoginRequest;
import com.pallavi.campuscart.dto.RegisterRequest;
import com.pallavi.campuscart.model.User;
import com.pallavi.campuscart.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.register(request);
            return ResponseEntity.ok(Map.of(
                "message", "Registered successfully",
                "userId", user.getId(),
                "name", user.getName()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> user = userService.login(request);
        if (user.isPresent()) {
            return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "userId", user.get().getId(),
                "name", user.get().getName(),
                "email", user.get().getEmail()
            ));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }
}