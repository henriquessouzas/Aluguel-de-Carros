package com.aluguelcarros.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class ClienteUpdateRequest {

    @NotBlank
    private String nome;

    @NotBlank
    private String endereco;

    @NotBlank
    private String profissao;

    @NotNull
    @Size(min = 1, max = 3, message = "O cliente deve ter entre 1 e 3 rendimentos.")
    @Valid
    private List<RendimentoRequest> rendimentos;
}
