package com.aluguelcarros.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

@Getter @Setter
public class RegisterClienteRequest {

    @NotBlank
    private String username;

    @NotBlank
    @Size(min = 6)
    private String senha;

    @NotBlank
    private String rg;

    @CPF
    @NotBlank
    private String cpf;

    @NotBlank
    private String nome;

    @NotBlank
    private String endereco;

    @NotBlank
    private String profissao;
}
