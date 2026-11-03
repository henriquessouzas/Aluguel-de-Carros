package com.aluguelcarros.dto;

import com.aluguelcarros.model.StatusPedido;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AvaliacaoRequest {

    @NotNull
    private StatusPedido parecer;

    @NotBlank
    private String justificativa;
}
