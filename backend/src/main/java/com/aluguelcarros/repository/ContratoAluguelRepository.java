package com.aluguelcarros.repository;

import com.aluguelcarros.model.ContratoAluguel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContratoAluguelRepository extends JpaRepository<ContratoAluguel, Long> {
    Optional<ContratoAluguel> findByPedidoId(Long pedidoId);
}
