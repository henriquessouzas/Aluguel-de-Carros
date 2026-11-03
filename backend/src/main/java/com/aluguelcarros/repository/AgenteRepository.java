package com.aluguelcarros.repository;

import com.aluguelcarros.model.Agente;
import com.aluguelcarros.model.TipoAgente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AgenteRepository extends JpaRepository<Agente, Long> {
    Optional<Agente> findByCnpj(String cnpj);
    Optional<Agente> findByUsuarioId(Long usuarioId);
    List<Agente> findByTipo(TipoAgente tipo);
    boolean existsByCnpj(String cnpj);
}
