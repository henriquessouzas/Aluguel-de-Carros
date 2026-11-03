package com.aluguelcarros.controller;

import com.aluguelcarros.dto.ClienteResponse;
import com.aluguelcarros.dto.ClienteUpdateRequest;
import com.aluguelcarros.service.ClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<ClienteResponse> getMe(Principal principal) {
        return ResponseEntity.ok(clienteService.getByUsername(principal.getName()));
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<ClienteResponse> updateMe(Principal principal,
                                                     @Valid @RequestBody ClienteUpdateRequest request) {
        return ResponseEntity.ok(clienteService.update(principal.getName(), request));
    }

    @DeleteMapping("/me")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<Void> deleteMe(Principal principal) {
        clienteService.delete(principal.getName());
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @PreAuthorize("hasRole('AGENTE')")
    public ResponseEntity<List<ClienteResponse>> listAll() {
        return ResponseEntity.ok(clienteService.listAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('AGENTE')")
    public ResponseEntity<ClienteResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(clienteService.getById(id));
    }
}
