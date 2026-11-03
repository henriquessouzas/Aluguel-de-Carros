package com.aluguelcarros.repository;

import com.aluguelcarros.model.Automovel;
import com.aluguelcarros.model.TipoProprietario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AutomovelRepository extends JpaRepository<Automovel, Long> {
    Optional<Automovel> findByPlaca(String placa);
    Optional<Automovel> findByMatricula(String matricula);
    List<Automovel> findByTipoProprietarioAndProprietarioId(TipoProprietario tipo, Long proprietarioId);
    boolean existsByPlaca(String placa);
    boolean existsByMatricula(String matricula);
}
