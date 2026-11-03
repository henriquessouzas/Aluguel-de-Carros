package com.aluguelcarros.controller;

import com.aluguelcarros.dto.*;
import com.aluguelcarros.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerCliente(@Valid @RequestBody RegisterClienteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerCliente(request));
    }

    @PostMapping("/register-agente")
    public ResponseEntity<AuthResponse> registerAgente(@Valid @RequestBody RegisterAgenteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerAgente(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
