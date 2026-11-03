package com.aluguelcarros.repository;

import com.aluguelcarros.model.Rendimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RendimentoRepository extends JpaRepository<Rendimento, Long> {
    List<Rendimento> findByClienteId(Long clienteId);
    long countByClienteId(Long clienteId);
}
