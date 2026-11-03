package com.aluguelcarros.repository;

import com.aluguelcarros.model.ContratoCredito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContratoCreditoRepository extends JpaRepository<ContratoCredito, Long> {
    Optional<ContratoCredito> findByContratoAluguelId(Long contratoAluguelId);
    List<ContratoCredito> findByBancoId(Long bancoId);
}
