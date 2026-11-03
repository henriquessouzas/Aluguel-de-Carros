package com.aluguelcarros.dto;

import com.aluguelcarros.model.TipoAgente;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RegisterAgenteRequest {

    @NotBlank
    private String username;

    @NotBlank
    @Size(min = 6)
    private String senha;

    @NotBlank
    private String nome;

    @NotBlank
    private String cnpj;

    @NotNull
    private TipoAgente tipo;
}
