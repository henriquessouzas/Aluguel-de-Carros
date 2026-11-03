package com.aluguelcarros.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class RendimentoResponse {
    private Long id;
    private String entidadeEmpregadora;
    private BigDecimal valor;
}
