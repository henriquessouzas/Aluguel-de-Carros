package com.aluguelcarros.dto;

import com.aluguelcarros.model.TipoProprietario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AutomovelRequest {

    @NotBlank
    private String matricula;

    @NotNull
    @Positive
    private Integer ano;

    @NotBlank
    private String marca;

    @NotBlank
    private String modelo;

    @NotBlank
    private String placa;

    @NotNull
    private TipoProprietario tipoProprietario;

    @NotNull
    private Long proprietarioId;
}
