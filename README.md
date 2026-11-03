# 🚗 Sistema de Aluguel de Carros 👨‍💻

> [!NOTE]
> Sistema web fullstack para gerenciamento de aluguéis de automóveis, desenvolvido como trabalho prático da disciplina de **Desenvolvimento e Integração de Aplicações Web** — PUC Minas.
> Permite que clientes solicitem aluguéis e que agentes (empresas/bancos) realizem análise financeira, aprovação e formalização de contratos.

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        O <b>Sistema de Aluguel de Carros</b> é uma aplicação web fullstack que digitaliza o processo de locação de veículos com análise de crédito. Clientes cadastram-se, informam seus rendimentos e solicitam pedidos de aluguel. Agentes (empresas ou bancos) analisam financeiramente cada pedido, emitem parecer de aprovação ou reprovação e, quando aprovado, registram o contrato de aluguel — podendo associar um contrato de crédito bancário. O sistema implementa autenticação JWT stateless, controle de acesso por perfil (CLIENTE/AGENTE), máquina de estados para o ciclo de vida dos pedidos e uma interface React responsiva integrada a um banco PostgreSQL hospedado no Supabase.
      </div>
    </td>
    <td>
      <div align="center">
        🚗
      </div>
    </td>
  </tr>
</table>

---

## 🚧 Status do Projeto

[![Versão](https://img.shields.io/badge/Versão-v1.0.0-blue?style=for-the-badge)](https://github.com)
![Java](https://img.shields.io/badge/Java-25-007ec6?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.0-007ec6?style=for-the-badge&logo=springboot&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-3.9+-007ec6?style=for-the-badge&logo=apachemaven&logoColor=white)
![React](https://img.shields.io/badge/React-19-007ec6?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-007ec6?style=for-the-badge&logo=vite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-007ec6?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 📚 Índice

- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Variáveis de Ambiente](#-variáveis-de-ambiente)
  - [Instalação de Dependências](#-instalação-de-dependências)
  - [Como Executar a Aplicação](#-como-executar-a-aplicação)
- [Endpoints Principais](#-endpoints-principais)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Diagramas](#-diagramas)
- [O que mudou em relação ao modelo inicial](#-o-que-mudou-em-relação-ao-modelo-inicial)
- [Documentações Utilizadas](#-documentações-utilizadas)
- [Autores](#-autores)
- [Agradecimentos](#-agradecimentos)
- [Licença](#-licença)

---

## 🔗 Links Úteis

* 📖 **Diagramas UML:** [`/docs`](./docs)
* 📖 **Casos de Uso:** [`/docs/casos-de-uso.md`](./docs/casos-de-uso.md)
* 📖 **Diagrama de Classes:** [`/docs/diagrama-classes.md`](./docs/diagrama-classes.md)
* 📖 **Diagrama de Pacotes:** [`/docs/diagrama-pacotes.md`](./docs/diagrama-pacotes.md)
* 📖 **Histórias de Usuário:** [`/docs/historias-usuario.md`](./docs/historias-usuario.md)
* 📖 **Supabase:** [https://supabase.com](https://supabase.com)
* 📖 **Spring Boot Docs:** [https://docs.spring.io/spring-boot](https://docs.spring.io/spring-boot/docs/current/reference/html/)

---

## 📝 Sobre o Projeto

O sistema foi desenvolvido como trabalho prático da disciplina de **Desenvolvimento e Integração de Aplicações Web** da PUC Minas. O objetivo é simular um processo real de aluguel de veículos com análise de crédito, envolvendo dois perfis de usuário com responsabilidades distintas:

- **Cliente (pessoa física):** cadastra-se com RG, CPF, endereço, profissão e até 3 rendimentos; solicita pedidos de aluguel; acompanha o status; pode modificar ou cancelar pedidos em análise.
- **Agente (empresa ou banco):** analisa financeiramente os pedidos; aprova ou reprova com justificativa; registra contratos de aluguel; associa contratos de crédito bancário quando aplicável.

O ciclo de vida de um pedido segue a máquina de estados: `EM_ANALISE → APROVADO/REPROVADO → CONTRATADO/CANCELADO`, com validação de transições inválidas retornando HTTP 409.

---

## ✨ Funcionalidades Principais

### Perfil Cliente
- 🔐 **Cadastro e Login** com JWT (BCrypt para senhas)
- 👤 **Gerenciamento de perfil** — visualizar, editar e excluir conta
- 💰 **Rendimentos** — até 3 por cliente (entidade empregadora + valor)
- 📋 **Pedidos de aluguel** — criar, consultar, modificar (se EM_ANALISE) e cancelar
- 🚗 **Automóveis** — visualizar lista e cadastrar veículos próprios

### Perfil Agente (Empresa/Banco)
- 🔐 **Cadastro e Login** com JWT
- 👥 **Consulta de clientes** — listar todos e visualizar por ID
- 🚗 **Gerenciamento de automóveis** — CRUD completo
- 📊 **Análise de pedidos** — visualizar todos, modificar condições, emitir parecer (APROVADO/REPROVADO)
- 📄 **Contratos** — registrar contrato de aluguel (muda status para CONTRATADO)
- 🏦 **Contrato de crédito** — associar financiamento bancário ao contrato (apenas agentes BANCO)

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React | 19 | Framework de UI |
| Vite | 6 | Build tool e dev server |
| React Router DOM | 7 | Roteamento SPA |
| Axios | 1.x | Chamadas HTTP com interceptor JWT |
| CSS puro | — | Estilização responsiva (sem framework) |

### 🖥️ Back-end

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Java | 25 | Linguagem principal |
| Spring Boot | 4.0.0 | Framework principal |
| Spring Security | 6.x | Autenticação e autorização |
| Spring Data JPA | 3.x | Persistência com Hibernate |
| JJWT | 0.12.6 | Geração e validação de tokens JWT |
| Lombok | 1.18.x | Redução de boilerplate |
| Bean Validation | 3.x | Validação de DTOs (`@CPF`, `@NotBlank`, etc.) |
| Maven | 3.9+ | Gerenciamento de dependências e build |

### 🗄️ Banco de Dados

| Tecnologia | Uso |
|------------|-----|
| PostgreSQL (Supabase) | Banco de dados principal em nuvem |
| Hibernate DDL auto=update | Criação/atualização automática do schema |

---

## 🏗 Arquitetura

O sistema segue a arquitetura **MVC em camadas** no backend e **SPA com Context API** no frontend.

### Backend — Pacotes

```
com.aluguelcarros
├── config      → SecurityConfig, JwtService, JwtAuthenticationFilter, UserDetailsServiceImpl
├── controller  → AuthController, ClienteController, AutomovelController, PedidoController, HealthController
├── service     → AuthService, ClienteService, AutomovelService, PedidoService
├── repository  → interfaces JpaRepository para cada entidade
├── model       → entidades JPA + enums (RoleUsuario, TipoAgente, StatusPedido, TipoProprietario)
├── dto         → objetos de request/response (sem expor entidades diretamente)
└── exception   → GlobalExceptionHandler + exceções tipadas (Business, NotFound, Unauthorized, StatusTransition)
```

### Frontend — Pastas

```
frontend/src
├── services    → api.js (axios + interceptor), clienteService.js, pedidoService.js
├── context     → AuthContext (login, logout, user, role persistidos no localStorage)
├── components  → Navbar, PrivateRoute, StatusBadge, Modal
└── pages       → Login, Cadastro, Home, PerfilCliente, MeusPedidos, NovoPedido, Automoveis, AnalisePedidos
```

### Fluxo de autenticação

```
Frontend → POST /api/auth/login → AuthController → AuthService
         → BCrypt verifica senha → JwtService gera token
         → retorna { token, role, userId, username }
         → localStorage armazena token
         → JwtAuthenticationFilter valida token em cada requisição
```

### Máquina de estados — PedidoAluguel

```
EM_ANALISE ──(avaliar: APROVADO)──→ APROVADO ──(registrar contrato)──→ CONTRATADO
EM_ANALISE ──(avaliar: REPROVADO)─→ REPROVADO
EM_ANALISE ──(cancelar)──────────→ CANCELADO
APROVADO   ──(cancelar)──────────→ CANCELADO
```
Transições inválidas retornam **HTTP 409 Conflict**.

### Diagramas

| Diagrama | Arquivo |
| :---: | :---: |
| **Casos de Uso** | [`docs/diagramas/casos-de-uso.puml`](./docs/diagramas/casos-de-uso.puml) |
| **Classes** | [`docs/diagramas/diagrama-classes.puml`](./docs/diagramas/diagrama-classes.puml) |
| **Pacotes** | [`docs/diagramas/diagrama-pacotes.puml`](./docs/diagramas/diagrama-pacotes.puml) |

---

## 🔧 Instalação e Execução

### Pré-requisitos

* **Java JDK 25** — [Download](https://jdk.java.net/25/)
* **Maven 3.9+** — [Download](https://maven.apache.org/download.cgi)
* **Node.js 20+ LTS** — [Download](https://nodejs.org/)
* **Conta no Supabase** — [https://supabase.com](https://supabase.com) (gratuito)

---

### 🔑 Variáveis de Ambiente

#### 1. Back-end (Spring Boot)

Crie o arquivo `backend/.env` baseado no `backend/.env.example`:

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `SUPABASE_DB_URL` | URL JDBC do Supabase | `jdbc:postgresql://<host>:5432/postgres` |
| `SUPABASE_DB_USER` | Usuário do banco | `postgres` |
| `SUPABASE_DB_PASSWORD` | Senha do banco | `sua_senha_supabase` |
| `JWT_SECRET` | Chave secreta JWT (mín. 32 chars) | `chave_super_secreta_aqui` |

> **Como obter a connection string no Supabase:**
> 1. Acesse [supabase.com](https://supabase.com) → seu projeto
> 2. Vá em **Project Settings → Database → Connection string**
> 3. Selecione o modo **JDBC** e copie a URL
> 4. O usuário padrão é `postgres` e a senha é a definida na criação do projeto

> [!IMPORTANT]
> O `JWT_SECRET` deve ter no mínimo 32 caracteres para o algoritmo HMAC-SHA256.
> Gere um segredo forte com: `openssl rand -hex 64`

#### 2. Front-end (React + Vite)

A URL da API está fixada em `http://localhost:8080/api` no arquivo `frontend/src/services/api.js`. Para alterar, edite diretamente o arquivo ou crie `frontend/.env`:

```
VITE_API_URL=http://localhost:8080/api
```

---

### 📦 Instalação de Dependências

```bash
# Clone o repositório
git clone <URL_DO_REPOSITÓRIO>
cd Aluguel-de-Carros

# Front-end
cd frontend
npm install
cd ..

# Back-end (baixa dependências Maven)
cd backend
./mvnw clean install -DskipTests
cd ..
```

---

### ⚡ Como Executar a Aplicação

Execute em **dois terminais separados**:

#### Terminal 1 — Back-end (Spring Boot)

```bash
cd backend

# Linux/Mac
export SUPABASE_DB_URL=jdbc:postgresql://<host>:5432/postgres
export SUPABASE_DB_USER=postgres
export SUPABASE_DB_PASSWORD=sua_senha
export JWT_SECRET=sua_chave_jwt_secreta

# Windows (PowerShell)
$env:SUPABASE_DB_URL="jdbc:postgresql://<host>:5432/postgres"
$env:SUPABASE_DB_USER="postgres"
$env:SUPABASE_DB_PASSWORD="sua_senha"
$env:JWT_SECRET="sua_chave_jwt_secreta"

mvn spring-boot:run
```

🚀 API disponível em **http://localhost:8080**
✅ Health check: **http://localhost:8080/api/health**

#### Terminal 2 — Front-end (React + Vite)

```bash
cd frontend
npm run dev
```

🎨 Aplicação disponível em **http://localhost:5173**

---

## 📡 Endpoints Principais

### Autenticação — público

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/auth/register` | Cadastro de cliente |
| `POST` | `/api/auth/register-agente` | Cadastro de agente (empresa/banco) |
| `POST` | `/api/auth/login` | Login — retorna `{ token, role, userId, username }` |
| `GET`  | `/api/health` | Health check |

### Clientes — requer token

| Método | Endpoint | Role | Descrição |
|--------|----------|------|-----------|
| `GET` | `/api/clientes/me` | CLIENTE | Consulta próprio perfil |
| `PUT` | `/api/clientes/me` | CLIENTE | Atualiza perfil e rendimentos |
| `DELETE` | `/api/clientes/me` | CLIENTE | Exclui conta |
| `GET` | `/api/clientes` | AGENTE | Lista todos os clientes |
| `GET` | `/api/clientes/{id}` | AGENTE | Consulta cliente por ID |

### Automóveis — requer token

| Método | Endpoint | Role | Descrição |
|--------|----------|------|-----------|
| `GET` | `/api/automoveis` | qualquer | Lista automóveis |
| `GET` | `/api/automoveis/{id}` | qualquer | Consulta por ID |
| `POST` | `/api/automoveis` | AGENTE / CLIENTE proprietário | Cadastra automóvel |
| `PUT` | `/api/automoveis/{id}` | AGENTE / CLIENTE proprietário | Atualiza automóvel |
| `DELETE` | `/api/automoveis/{id}` | AGENTE / CLIENTE proprietário | Remove automóvel |

### Pedidos de Aluguel — requer token

| Método | Endpoint | Role | Descrição |
|--------|----------|------|-----------|
| `POST` | `/api/pedidos` | CLIENTE | Cria pedido (status: EM_ANALISE) |
| `GET` | `/api/pedidos` | CLIENTE | Lista pedidos do cliente logado |
| `GET` | `/api/pedidos/{id}` | CLIENTE | Consulta pedido próprio |
| `PUT` | `/api/pedidos/{id}` | CLIENTE | Modifica pedido (só EM_ANALISE) |
| `PATCH` | `/api/pedidos/{id}/cancelar` | CLIENTE | Cancela pedido |
| `GET` | `/api/pedidos/todos` | AGENTE | Lista todos os pedidos |
| `PUT` | `/api/pedidos/{id}/agente` | AGENTE | Modifica pedido durante análise |
| `PATCH` | `/api/pedidos/{id}/avaliar` | AGENTE | Emite parecer (APROVADO/REPROVADO) |
| `POST` | `/api/pedidos/{id}/contrato` | AGENTE | Registra contrato (status: CONTRATADO) |

---

## 📂 Estrutura de Pastas

```
Aluguel-de-Carros/
├── .gitignore
├── README.md
├── LICENSE
│
├── docs/                              # Documentação e diagramas UML
│   ├── casos-de-uso.md
│   ├── diagrama-classes.md
│   ├── diagrama-pacotes.md
│   ├── historias-usuario.md
│   └── diagramas/
│       ├── casos-de-uso.puml
│       ├── diagrama-classes.puml
│       └── diagrama-pacotes.puml
│
├── backend/                           # API Spring Boot
│   ├── .env.example
│   ├── pom.xml
│   └── src/main/java/com/aluguelcarros/
│       ├── AluguelCarrosApplication.java
│       ├── config/                    # Security, JWT, UserDetails
│       ├── controller/                # REST controllers
│       ├── service/                   # Regras de negócio
│       ├── repository/                # Interfaces JPA
│       ├── model/                     # Entidades JPA + enums
│       ├── dto/                       # Request/Response objects
│       └── exception/                 # Exceções + GlobalExceptionHandler
│
└── frontend/                          # SPA React + Vite
    ├── package.json
    └── src/
        ├── services/                  # axios + chamadas HTTP
        ├── context/                   # AuthContext
        ├── components/                # Navbar, PrivateRoute, Modal, StatusBadge
        └── pages/                     # Login, Cadastro, Perfil, Pedidos, Análise
```

---

## 📊 Diagramas

Os diagramas estão em PlantUML na pasta [`/docs/diagramas`](./docs/diagramas) e embutidos nos arquivos Markdown em [`/docs`](./docs).

| Artefato | Markdown | PlantUML |
|----------|----------|----------|
| Casos de Uso | [casos-de-uso.md](./docs/casos-de-uso.md) | [casos-de-uso.puml](./docs/diagramas/casos-de-uso.puml) |
| Diagrama de Classes | [diagrama-classes.md](./docs/diagrama-classes.md) | [diagrama-classes.puml](./docs/diagramas/diagrama-classes.puml) |
| Diagrama de Pacotes | [diagrama-pacotes.md](./docs/diagrama-pacotes.md) | [diagrama-pacotes.puml](./docs/diagramas/diagrama-pacotes.puml) |
| Histórias de Usuário | [historias-usuario.md](./docs/historias-usuario.md) | — |

---

## 🔄 O que mudou em relação ao modelo inicial

Esta seção documenta as divergências entre o modelo UML inicial (Commit 1) e a implementação final, para apresentação na defesa.

### 1. `Usuario` — campo `login` renomeado para `username`
- **Modelo inicial:** atributo `login : String`
- **Implementado:** `username : String` — alinhado com a convenção do Spring Security (`UserDetails.getUsername()`)

### 2. `Agente` — campo `razaoSocial` renomeado para `nome`
- **Modelo inicial:** `razaoSocial : String`
- **Implementado:** `nome : String` — simplificado para cobrir tanto empresas quanto bancos sem distinção de nomenclatura jurídica

### 3. `Automovel` — relacionamento com proprietário simplificado
- **Modelo inicial:** associações diretas `Automovel → Cliente` e `Automovel → Agente` com multiplicidades
- **Implementado:** dois campos escalares `tipoProprietario : TipoProprietario` (enum) + `proprietarioId : Long` — evita joins desnecessários e suporta os três tipos (CLIENTE, EMPRESA, BANCO) sem herança ou tabelas extras

### 4. `PedidoAluguel` — campo `observacoes` adicionado
- **Modelo inicial:** não previsto
- **Implementado:** `observacoes : String` — necessário para o agente registrar notas durante a análise sem sobrescrever o `parecerFinanceiro`

### 5. `ContratoAluguel` — campo `assinadoEm` renomeado para `dataAssinatura`
- **Modelo inicial:** `assinadoEm : LocalDateTime`
- **Implementado:** `dataAssinatura : LocalDateTime` — nomenclatura mais clara e consistente com os demais campos de data

### 6. `ContratoCredito` — relacionamento com `ContratoAluguel` é opcional
- **Modelo inicial:** associação obrigatória
- **Implementado:** `@OneToOne(optional = true)` — permite criar `ContratoCredito` independente de um contrato de aluguel, conforme regra de negócio de bancos que podem ter créditos pré-aprovados

### 7. Casos de uso — granularidade aumentada
- **Modelo inicial:** casos de uso genéricos (ex: "Gerenciar cliente (CRUD)")
- **Implementado:** casos de uso mapeados 1:1 com endpoints REST, com método HTTP e rota explícitos — facilita rastreabilidade entre diagrama e código

### 8. Pacote `config` — classes de segurança adicionadas
- **Modelo inicial:** pacote `config` vazio (apenas dependência)
- **Implementado:** `SecurityConfig`, `JwtService`, `JwtAuthenticationFilter`, `UserDetailsServiceImpl` — toda a infraestrutura JWT/Spring Security concentrada neste pacote

### 9. Frontend — pacote `context` adicionado
- **Modelo inicial:** não previsto no diagrama de pacotes
- **Implementado:** `context/AuthContext.jsx` — gerencia estado global de autenticação com React Context API, necessário para compartilhar `user`, `role` e funções `login`/`logout` entre componentes

### 10. Exceções tipadas — `StatusTransitionException` adicionada
- **Modelo inicial:** não previsto
- **Implementado:** exceção dedicada para transições de status inválidas, retornando HTTP 409 Conflict — separação clara entre erro de negócio (400) e conflito de estado (409)

---

## 🔗 Documentações Utilizadas

* 📖 [Spring Boot 4.0 Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
* 📖 [Spring Security Reference](https://docs.spring.io/spring-security/reference/)
* 📖 [JJWT 0.12.x Documentation](https://github.com/jwtk/jjwt)
* 📖 [React 19 Docs](https://react.dev/)
* 📖 [Vite Guide](https://vitejs.dev/guide/)
* 📖 [React Router v7](https://reactrouter.com/)
* 📖 [Supabase Docs](https://supabase.com/docs)
* 📖 [Hibernate Validator — @CPF](https://docs.jboss.org/hibernate/validator/8.0/reference/en-US/html_single/)
* 📖 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
* 📖 [PlantUML Reference](https://plantuml.com/en/)

---

## 👥 Autores

| 👤 Nome | 🖼️ Foto | :octocat: GitHub | 💼 LinkedIn | 📤 Gmail |
|---------|----------|-----------------|-------------|-----------|
| &lt;Nome do integrante 1&gt; | <div align="center"><img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/user1"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.linkedin.com/in/user1"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> | <div align="center"><a href="mailto:user1@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |
| &lt;Nome do integrante 2&gt; | <div align="center"><img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/user2"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.linkedin.com/in/user2"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> | <div align="center"><a href="mailto:user2@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |

> [!TIP]
> Substitua os campos `<Nome do integrante>`, links do GitHub, LinkedIn e e-mail pelos dados reais da equipe antes da entrega.

---

## 🙏 Agradecimentos

* [**Engenharia de Software PUC Minas**](https://www.instagram.com/engsoftwarepucminas/) — Pelo apoio institucional e estrutura acadêmica.
* [**Prof. Dr. João Paulo Aramuni**](https://github.com/joaopauloaramuni) — Pelos ensinamentos sobre Arquitetura de Software, padrões de projeto e pelo template de documentação.

---

## 📄 Licença

Este projeto é distribuído sob a **[Licença MIT](./LICENSE)**.
