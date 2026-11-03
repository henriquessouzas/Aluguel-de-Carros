package com.aluguelcarros.service;

import com.aluguelcarros.dto.*;
import com.aluguelcarros.exception.BusinessException;
import com.aluguelcarros.exception.ResourceNotFoundException;
import com.aluguelcarros.model.Cliente;
import com.aluguelcarros.model.Rendimento;
import com.aluguelcarros.repository.ClienteRepository;
import com.aluguelcarros.repository.RendimentoRepository;
import com.aluguelcarros.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final RendimentoRepository rendimentoRepository;
    private final UsuarioRepository usuarioRepository;

    public ClienteResponse getByUsername(String username) {
        return toResponse(findByUsername(username));
    }

    public List<ClienteResponse> listAll() {
        return clienteRepository.findAll().stream().map(this::toResponse).toList();
    }

    public ClienteResponse getById(Long id) {
        return toResponse(clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado: " + id)));
    }

    @Transactional
    public ClienteResponse update(String username, ClienteUpdateRequest req) {
        Cliente cliente = findByUsername(username);

        cliente.setNome(req.getNome());
        cliente.setEndereco(req.getEndereco());
        cliente.setProfissao(req.getProfissao());

        rendimentoRepository.deleteAll(cliente.getRendimentos());
        cliente.getRendimentos().clear();

        List<Rendimento> novos = req.getRendimentos().stream().map(r -> {
            Rendimento rend = new Rendimento();
            rend.setCliente(cliente);
            rend.setEntidadeEmpregadora(r.getEntidadeEmpregadora());
            rend.setValor(r.getValor());
            return rend;
        }).toList();

        cliente.getRendimentos().addAll(novos);
        clienteRepository.save(cliente);
        return toResponse(cliente);
    }

    @Transactional
    public void delete(String username) {
        Cliente cliente = findByUsername(username);
        Long usuarioId = cliente.getUsuario().getId();
        clienteRepository.delete(cliente);
        usuarioRepository.deleteById(usuarioId);
    }

    private Cliente findByUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .flatMap(u -> clienteRepository.findByUsuarioId(u.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado para o usuário: " + username));
    }

    private ClienteResponse toResponse(Cliente c) {
        List<RendimentoResponse> rendimentos = c.getRendimentos().stream()
                .map(r -> new RendimentoResponse(r.getId(), r.getEntidadeEmpregadora(), r.getValor()))
                .toList();
        return new ClienteResponse(
                c.getId(),
                c.getUsuario().getUsername(),
                c.getRg(),
                c.getCpf(),
                c.getNome(),
                c.getEndereco(),
                c.getProfissao(),
                rendimentos
        );
    }
}
