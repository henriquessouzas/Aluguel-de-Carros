package com.aluguelcarros.repository;

import com.aluguelcarros.model.PedidoAluguel;
import com.aluguelcarros.model.StatusPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoAluguelRepository extends JpaRepository<PedidoAluguel, Long> {
    List<PedidoAluguel> findByClienteId(Long clienteId);
    List<PedidoAluguel> findByStatus(StatusPedido status);
    List<PedidoAluguel> findByClienteIdAndStatus(Long clienteId, StatusPedido status);
    List<PedidoAluguel> findByAgenteResponsavelId(Long agenteId);
}
