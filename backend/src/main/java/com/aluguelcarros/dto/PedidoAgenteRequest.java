package com.aluguelcarros.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter @Setter
public class PedidoAgenteRequest {
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private BigDecimal valor;
    private String observacoes;
}
