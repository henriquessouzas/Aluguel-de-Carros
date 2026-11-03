package com.aluguelcarros.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ContratoResponse {
    private Long id;
    private Long pedidoId;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private BigDecimal valor;
    private LocalDateTime dataAssinatura;
    // crédito (nullable)
    private Long contratoCreditoId;
    private Long bancoId;
    private BigDecimal valorFinanciado;
    private BigDecimal taxaJuros;
    private Integer parcelas;
}
