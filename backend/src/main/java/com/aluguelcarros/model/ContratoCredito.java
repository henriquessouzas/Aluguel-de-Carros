package com.aluguelcarros.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "contratos_credito")
@Getter @Setter @NoArgsConstructor
public class ContratoCredito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = true)
    @JoinColumn(name = "contrato_aluguel_id", unique = true)
    private ContratoAluguel contratoAluguel;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "banco_id")
    private Agente banco;

    @Positive
    @NotNull
    @Column(nullable = false)
    private BigDecimal valorFinanciado;

    @Positive
    @NotNull
    @Column(nullable = false)
    private BigDecimal taxaJuros;

    @Positive
    @NotNull
    @Column(nullable = false)
    private Integer parcelas;

    @Column(nullable = false)
    private LocalDateTime emitidoEm;
}
