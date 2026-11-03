package com.aluguelcarros.service;

import com.aluguelcarros.dto.*;
import com.aluguelcarros.exception.*;
import com.aluguelcarros.model.*;
import com.aluguelcarros.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoAluguelRepository pedidoRepository;
    private final ContratoAluguelRepository contratoRepository;
    private final ContratoCreditoRepository creditoRepository;
    private final ClienteRepository clienteRepository;
    private final AgenteRepository agenteRepository;
    private final AutomovelRepository automovelRepository;
    private final UsuarioRepository usuarioRepository;

    // ── CLIENTE ──────────────────────────────────────────────────────────────

    @Transactional
    public PedidoResponse criar(PedidoRequest req, String username) {
        Cliente cliente = clienteByUsername(username);
        Automovel automovel = automovelOrThrow(req.getAutomovelId());

        PedidoAluguel pedido = new PedidoAluguel();
        pedido.setCliente(cliente);
        pedido.setAutomovel(automovel);
        pedido.setDataInicio(req.getDataInicio());
        pedido.setDataFim(req.getDataFim());
        pedido.setValor(req.getValor());
        pedido.setStatus(StatusPedido.EM_ANALISE);

        return toResponse(pedidoRepository.save(pedido));
    }

    public List<PedidoResponse> listarDoCliente(String username) {
        Cliente cliente = clienteByUsername(username);
        return pedidoRepository.findByClienteId(cliente.getId())
                .stream().map(this::toResponse).toList();
    }

    public PedidoResponse getByIdParaCliente(Long id, String username) {
        Cliente cliente = clienteByUsername(username);
        PedidoAluguel pedido = pedidoOrThrow(id);
        if (!pedido.getCliente().getId().equals(cliente.getId()))
            throw new UnauthorizedException("Acesso negado a este pedido.");
        return toResponse(pedido);
    }

    @Transactional
    public PedidoResponse modificarPeloCliente(Long id, PedidoRequest req, String username) {
        Cliente cliente = clienteByUsername(username);
        PedidoAluguel pedido = pedidoOrThrow(id);

        if (!pedido.getCliente().getId().equals(cliente.getId()))
            throw new UnauthorizedException("Acesso negado a este pedido.");
        requireStatus(pedido, StatusPedido.EM_ANALISE);

        pedido.setAutomovel(automovelOrThrow(req.getAutomovelId()));
        pedido.setDataInicio(req.getDataInicio());
        pedido.setDataFim(req.getDataFim());
        pedido.setValor(req.getValor());

        return toResponse(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponse cancelar(Long id, String username) {
        Cliente cliente = clienteByUsername(username);
        PedidoAluguel pedido = pedidoOrThrow(id);

        if (!pedido.getCliente().getId().equals(cliente.getId()))
            throw new UnauthorizedException("Acesso negado a este pedido.");

        if (!Set.of(StatusPedido.EM_ANALISE, StatusPedido.APROVADO).contains(pedido.getStatus()))
            throw new StatusTransitionException(
                    "Não é possível cancelar pedido com status " + pedido.getStatus());

        pedido.setStatus(StatusPedido.CANCELADO);
        return toResponse(pedidoRepository.save(pedido));
    }

    // ── AGENTE ───────────────────────────────────────────────────────────────

    public List<PedidoResponse> listarTodos() {
        return pedidoRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional
    public PedidoResponse modificarPeloAgente(Long id, PedidoAgenteRequest req, String username) {
        Agente agente = agenteByUsername(username);
        PedidoAluguel pedido = pedidoOrThrow(id);
        requireStatus(pedido, StatusPedido.EM_ANALISE);

        if (req.getDataInicio() != null) pedido.setDataInicio(req.getDataInicio());
        if (req.getDataFim() != null) pedido.setDataFim(req.getDataFim());
        if (req.getValor() != null) pedido.setValor(req.getValor());
        if (req.getObservacoes() != null) pedido.setObservacoes(req.getObservacoes());
        pedido.setAgenteResponsavel(agente);

        return toResponse(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponse avaliar(Long id, AvaliacaoRequest req, String username) {
        Agente agente = agenteByUsername(username);
        PedidoAluguel pedido = pedidoOrThrow(id);
        requireStatus(pedido, StatusPedido.EM_ANALISE);

        if (!Set.of(StatusPedido.APROVADO, StatusPedido.REPROVADO).contains(req.getParecer()))
            throw new BusinessException("Parecer deve ser APROVADO ou REPROVADO.");

        pedido.setStatus(req.getParecer());
        pedido.setParecerFinanceiro(req.getJustificativa());
        pedido.setAgenteResponsavel(agente);

        return toResponse(pedidoRepository.save(pedido));
    }

    @Transactional
    public ContratoResponse registrarContrato(Long pedidoId, ContratoRequest req, String username) {
        Agente agente = agenteByUsername(username);
        PedidoAluguel pedido = pedidoOrThrow(pedidoId);

        if (pedido.getStatus() != StatusPedido.APROVADO)
            throw new StatusTransitionException(
                    "Contrato só pode ser registrado para pedidos APROVADOS. Status atual: " + pedido.getStatus());

        if (contratoRepository.findByPedidoId(pedidoId).isPresent())
            throw new BusinessException("Este pedido já possui um contrato registrado.");

        ContratoAluguel contrato = new ContratoAluguel();
        contrato.setPedido(pedido);
        contrato.setDataInicio(req.getDataInicio());
        contrato.setDataFim(req.getDataFim());
        contrato.setValor(req.getValor());
        contrato.setDataAssinatura(LocalDateTime.now());
        contratoRepository.save(contrato);

        pedido.setStatus(StatusPedido.CONTRATADO);
        pedidoRepository.save(pedido);

        ContratoCredito credito = null;
        if (req.getBancoId() != null) {
            Agente banco = agenteRepository.findById(req.getBancoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Banco não encontrado: " + req.getBancoId()));
            if (banco.getTipo() != TipoAgente.BANCO)
                throw new BusinessException("O agente informado não é do tipo BANCO.");

            credito = new ContratoCredito();
            credito.setContratoAluguel(contrato);
            credito.setBanco(banco);
            credito.setValorFinanciado(req.getValorFinanciado());
            credito.setTaxaJuros(req.getTaxaJuros());
            credito.setParcelas(req.getParcelas());
            credito.setEmitidoEm(LocalDateTime.now());
            creditoRepository.save(credito);
        }

        return toContratoResponse(contrato, credito);
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private void requireStatus(PedidoAluguel pedido, StatusPedido esperado) {
        if (pedido.getStatus() != esperado)
            throw new StatusTransitionException(
                    "Operação requer status " + esperado + ". Status atual: " + pedido.getStatus());
    }

    private Cliente clienteByUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .flatMap(u -> clienteRepository.findByUsuarioId(u.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado."));
    }

    private Agente agenteByUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .flatMap(u -> agenteRepository.findByUsuarioId(u.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Agente não encontrado."));
    }

    private PedidoAluguel pedidoOrThrow(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado: " + id));
    }

    private Automovel automovelOrThrow(Long id) {
        return automovelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Automóvel não encontrado: " + id));
    }

    private PedidoResponse toResponse(PedidoAluguel p) {
        String autoDesc = p.getAutomovel().getMarca() + " " + p.getAutomovel().getModelo()
                + " (" + p.getAutomovel().getPlaca() + ")";
        return new PedidoResponse(
                p.getId(),
                p.getCliente().getId(),
                p.getCliente().getNome(),
                p.getAutomovel().getId(),
                autoDesc,
                p.getDataInicio(),
                p.getDataFim(),
                p.getValor(),
                p.getStatus(),
                p.getParecerFinanceiro(),
                p.getAgenteResponsavel() != null ? p.getAgenteResponsavel().getId() : null,
                p.getObservacoes(),
                p.getCriadoEm(),
                p.getAtualizadoEm()
        );
    }

    private ContratoResponse toContratoResponse(ContratoAluguel c, ContratoCredito cr) {
        return new ContratoResponse(
                c.getId(),
                c.getPedido().getId(),
                c.getDataInicio(),
                c.getDataFim(),
                c.getValor(),
                c.getDataAssinatura(),
                cr != null ? cr.getId() : null,
                cr != null ? cr.getBanco().getId() : null,
                cr != null ? cr.getValorFinanciado() : null,
                cr != null ? cr.getTaxaJuros() : null,
                cr != null ? cr.getParcelas() : null
        );
    }
}
