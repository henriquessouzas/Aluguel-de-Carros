package com.aluguelcarros.controller;

import com.aluguelcarros.dto.*;
import com.aluguelcarros.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    // ── CLIENTE ──────────────────────────────────────────────────────────────

    @PostMapping
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<PedidoResponse> criar(@Valid @RequestBody PedidoRequest request,
                                                 Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(pedidoService.criar(request, principal.getName()));
    }

    @GetMapping
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<List<PedidoResponse>> listarMeus(Principal principal) {
        return ResponseEntity.ok(pedidoService.listarDoCliente(principal.getName()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<PedidoResponse> getById(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(pedidoService.getByIdParaCliente(id, principal.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<PedidoResponse> modificar(@PathVariable Long id,
                                                      @Valid @RequestBody PedidoRequest request,
                                                      Principal principal) {
        return ResponseEntity.ok(pedidoService.modificarPeloCliente(id, request, principal.getName()));
    }

    @PatchMapping("/{id}/cancelar")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<PedidoResponse> cancelar(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(pedidoService.cancelar(id, principal.getName()));
    }

    // ── AGENTE ───────────────────────────────────────────────────────────────

    @GetMapping("/todos")
    @PreAuthorize("hasRole('AGENTE')")
    public ResponseEntity<List<PedidoResponse>> listarTodos() {
        return ResponseEntity.ok(pedidoService.listarTodos());
    }

    @PutMapping("/{id}/agente")
    @PreAuthorize("hasRole('AGENTE')")
    public ResponseEntity<PedidoResponse> modificarAgente(@PathVariable Long id,
                                                            @RequestBody PedidoAgenteRequest request,
                                                            Principal principal) {
        return ResponseEntity.ok(pedidoService.modificarPeloAgente(id, request, principal.getName()));
    }

    @PatchMapping("/{id}/avaliar")
    @PreAuthorize("hasRole('AGENTE')")
    public ResponseEntity<PedidoResponse> avaliar(@PathVariable Long id,
                                                    @Valid @RequestBody AvaliacaoRequest request,
                                                    Principal principal) {
        return ResponseEntity.ok(pedidoService.avaliar(id, request, principal.getName()));
    }

    @PostMapping("/{id}/contrato")
    @PreAuthorize("hasRole('AGENTE')")
    public ResponseEntity<ContratoResponse> registrarContrato(@PathVariable Long id,
                                                               @Valid @RequestBody ContratoRequest request,
                                                               Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(pedidoService.registrarContrato(id, request, principal.getName()));
    }
}
