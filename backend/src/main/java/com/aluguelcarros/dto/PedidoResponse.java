package com.aluguelcarros.dto;

import com.aluguelcarros.model.StatusPedido;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PedidoResponse {
    private Long id;
    private Long clienteId;
    private String clienteNome;
    private Long automovelId;
    private String automovelDescricao;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private BigDecimal valor;
    private StatusPedido status;
    private String parecerFinanceiro;
    private Long agenteResponsavelId;
    private String observacoes;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;
}
