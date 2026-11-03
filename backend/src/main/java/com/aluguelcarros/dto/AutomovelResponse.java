package com.aluguelcarros.dto;

import com.aluguelcarros.model.TipoProprietario;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AutomovelResponse {
    private Long id;
    private String matricula;
    private Integer ano;
    private String marca;
    private String modelo;
    private String placa;
    private TipoProprietario tipoProprietario;
    private Long proprietarioId;
}
