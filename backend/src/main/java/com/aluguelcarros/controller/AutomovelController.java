package com.aluguelcarros.controller;

import com.aluguelcarros.dto.AutomovelRequest;
import com.aluguelcarros.dto.AutomovelResponse;
import com.aluguelcarros.service.AutomovelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/automoveis")
@RequiredArgsConstructor
public class AutomovelController {

    private final AutomovelService automovelService;

    @GetMapping
    public ResponseEntity<List<AutomovelResponse>> listAll() {
        return ResponseEntity.ok(automovelService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AutomovelResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(automovelService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('AGENTE','CLIENTE')")
    public ResponseEntity<AutomovelResponse> create(@Valid @RequestBody AutomovelRequest request,
                                                     Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(automovelService.create(request, principal.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('AGENTE','CLIENTE')")
    public ResponseEntity<AutomovelResponse> update(@PathVariable Long id,
                                                     @Valid @RequestBody AutomovelRequest request,
                                                     Principal principal) {
        return ResponseEntity.ok(automovelService.update(id, request, principal.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('AGENTE','CLIENTE')")
    public ResponseEntity<Void> delete(@PathVariable Long id, Principal principal) {
        automovelService.delete(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}
