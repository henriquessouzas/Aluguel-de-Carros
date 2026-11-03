package com.aluguelcarros.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter @Setter
public class ContratoRequest {

    @NotNull
    private LocalDate dataInicio;

    @NotNull
    private LocalDate dataFim;

    @NotNull
    @Positive
    private BigDecimal valor;

    // Campos opcionais para ContratoCredito (apenas banco agente)
    private Long bancoId;
    private BigDecimal valorFinanciado;
    private BigDecimal taxaJuros;
    private Integer parcelas;
}
