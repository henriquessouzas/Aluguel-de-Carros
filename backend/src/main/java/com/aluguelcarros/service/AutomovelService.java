package com.aluguelcarros.service;

import com.aluguelcarros.dto.AutomovelRequest;
import com.aluguelcarros.dto.AutomovelResponse;
import com.aluguelcarros.exception.BusinessException;
import com.aluguelcarros.exception.ResourceNotFoundException;
import com.aluguelcarros.exception.UnauthorizedException;
import com.aluguelcarros.model.*;
import com.aluguelcarros.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AutomovelService {

    private final AutomovelRepository automovelRepository;
    private final UsuarioRepository usuarioRepository;
    private final ClienteRepository clienteRepository;
    private final AgenteRepository agenteRepository;

    public List<AutomovelResponse> listAll() {
        return automovelRepository.findAll().stream().map(this::toResponse).toList();
    }

    public AutomovelResponse getById(Long id) {
        return toResponse(findOrThrow(id));
    }

    @Transactional
    public AutomovelResponse create(AutomovelRequest req, String username) {
        if (automovelRepository.existsByPlaca(req.getPlaca()))
            throw new BusinessException("Placa já cadastrada: " + req.getPlaca());
        if (automovelRepository.existsByMatricula(req.getMatricula()))
            throw new BusinessException("Matrícula já cadastrada: " + req.getMatricula());

        Automovel a = new Automovel();
        fill(a, req);
        return toResponse(automovelRepository.save(a));
    }

    @Transactional
    public AutomovelResponse update(Long id, AutomovelRequest req, String username) {
        Automovel a = findOrThrow(id);
        checkOwnership(a, username);

        if (!a.getPlaca().equals(req.getPlaca()) && automovelRepository.existsByPlaca(req.getPlaca()))
            throw new BusinessException("Placa já cadastrada: " + req.getPlaca());
        if (!a.getMatricula().equals(req.getMatricula()) && automovelRepository.existsByMatricula(req.getMatricula()))
            throw new BusinessException("Matrícula já cadastrada: " + req.getMatricula());

        fill(a, req);
        return toResponse(automovelRepository.save(a));
    }

    @Transactional
    public void delete(Long id, String username) {
        Automovel a = findOrThrow(id);
        checkOwnership(a, username);
        automovelRepository.delete(a);
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private void fill(Automovel a, AutomovelRequest req) {
        a.setMatricula(req.getMatricula());
        a.setAno(req.getAno());
        a.setMarca(req.getMarca());
        a.setModelo(req.getModelo());
        a.setPlaca(req.getPlaca());
        a.setTipoProprietario(req.getTipoProprietario());
        a.setProprietarioId(req.getProprietarioId());
    }

    private void checkOwnership(Automovel a, String username) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado."));

        if (usuario.getRole() == RoleUsuario.AGENTE) return; // agente sempre pode

        // cliente só pode se for o proprietário
        Cliente cliente = clienteRepository.findByUsuarioId(usuario.getId())
                .orElseThrow(() -> new UnauthorizedException("Acesso negado."));

        if (a.getTipoProprietario() != TipoProprietario.CLIENTE
                || !a.getProprietarioId().equals(cliente.getId())) {
            throw new UnauthorizedException("Você não é o proprietário deste automóvel.");
        }
    }

    private Automovel findOrThrow(Long id) {
        return automovelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Automóvel não encontrado: " + id));
    }

    private AutomovelResponse toResponse(Automovel a) {
        return new AutomovelResponse(a.getId(), a.getMatricula(), a.getAno(),
                a.getMarca(), a.getModelo(), a.getPlaca(),
                a.getTipoProprietario(), a.getProprietarioId());
    }
}
