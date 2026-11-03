package com.aluguelcarros.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class RendimentoRequest {

    @NotBlank
    private String entidadeEmpregadora;

    @Positive
    private BigDecimal valor;
}
