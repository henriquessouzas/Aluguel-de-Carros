package com.aluguelcarros.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ClienteResponse {
    private Long id;
    private String username;
    private String rg;
    private String cpf;
    private String nome;
    private String endereco;
    private String profissao;
    private List<RendimentoResponse> rendimentos;
}
