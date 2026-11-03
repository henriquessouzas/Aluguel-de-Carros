package com.aluguelcarros.service;

import com.aluguelcarros.config.JwtService;
import com.aluguelcarros.dto.*;
import com.aluguelcarros.exception.BusinessException;
import com.aluguelcarros.model.*;
import com.aluguelcarros.repository.AgenteRepository;
import com.aluguelcarros.repository.ClienteRepository;
import com.aluguelcarros.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final ClienteRepository clienteRepository;
    private final AgenteRepository agenteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    @Transactional
    public AuthResponse registerCliente(RegisterClienteRequest req) {
        if (usuarioRepository.existsByUsername(req.getUsername())) {
            throw new BusinessException("Username já está em uso.");
        }
        if (clienteRepository.existsByCpf(req.getCpf())) {
            throw new BusinessException("CPF já cadastrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(req.getUsername());
        usuario.setSenha(passwordEncoder.encode(req.getSenha()));
        usuario.setRole(RoleUsuario.CLIENTE);
        usuarioRepository.save(usuario);

        Cliente cliente = new Cliente();
        cliente.setUsuario(usuario);
        cliente.setRg(req.getRg());
        cliente.setCpf(req.getCpf());
        cliente.setNome(req.getNome());
        cliente.setEndereco(req.getEndereco());
        cliente.setProfissao(req.getProfissao());
        clienteRepository.save(cliente);

        return buildAuthResponse(usuario);
    }

    @Transactional
    public AuthResponse registerAgente(RegisterAgenteRequest req) {
        if (usuarioRepository.existsByUsername(req.getUsername())) {
            throw new BusinessException("Username já está em uso.");
        }
        if (agenteRepository.existsByCnpj(req.getCnpj())) {
            throw new BusinessException("CNPJ já cadastrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(req.getUsername());
        usuario.setSenha(passwordEncoder.encode(req.getSenha()));
        usuario.setRole(RoleUsuario.AGENTE);
        usuarioRepository.save(usuario);

        Agente agente = new Agente();
        agente.setUsuario(usuario);
        agente.setNome(req.getNome());
        agente.setCnpj(req.getCnpj());
        agente.setTipo(req.getTipo());
        agenteRepository.save(agente);

        return buildAuthResponse(usuario);
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getSenha())
        );

        Usuario usuario = usuarioRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new BusinessException("Usuário não encontrado."));

        return buildAuthResponse(usuario);
    }

    private AuthResponse buildAuthResponse(Usuario usuario) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getUsername());
        String token = jwtService.generateToken(userDetails, Map.of("role", usuario.getRole().name()));
        return new AuthResponse(token, usuario.getRole().name(), usuario.getId(), usuario.getUsername());
    }
}
