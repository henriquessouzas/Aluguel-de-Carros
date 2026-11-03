# Diagrama de Classes — Sistema de Aluguel de Carros

> Arquivo fonte: [`/docs/diagramas/diagrama-classes.puml`](diagramas/diagrama-classes.puml)

```plantuml
@startuml diagrama-classes
skinparam classAttributeIconSize 0
skinparam linetype ortho

' ─── Enums ───────────────────────────────────────────────
enum RoleUsuario {
  CLIENTE
  AGENTE
}

enum TipoAgente {
  EMPRESA
  BANCO
}

enum StatusPedido {
  EM_ANALISE
  APROVADO
  REPROVADO
  CANCELADO
  CONTRATADO
}

enum TipoProprietario {
  CLIENTE
  EMPRESA
  BANCO
}

' ─── Model ───────────────────────────────────────────────
class Usuario {
  - id : Long
  - username : String  <<unique>>
  - senha : String     <<BCrypt>>
  - role : RoleUsuario
}

class Cliente {
  - id : Long
  - rg : String
  - cpf : String       <<unique, @CPF>>
  - nome : String
  - endereco : String
  - profissao : String
}

class Rendimento {
  - id : Long
  - entidadeEmpregadora : String
  - valor : BigDecimal
}

class Agente {
  - id : Long
  - nome : String
  - cnpj : String      <<unique>>
  - tipo : TipoAgente
}

class Automovel {
  - id : Long
  - matricula : String <<unique>>
  - ano : Integer
  - marca : String
  - modelo : String
  - placa : String     <<unique>>
  - tipoProprietario : TipoProprietario
  - proprietarioId : Long
}

class PedidoAluguel {
  - id : Long
  - dataInicio : LocalDate
  - dataFim : LocalDate
  - valor : BigDecimal
  - status : StatusPedido
  - parecerFinanceiro : String
  - observacoes : String
  - criadoEm : LocalDateTime
  - atualizadoEm : LocalDateTime
}

class ContratoAluguel {
  - id : Long
  - dataInicio : LocalDate
  - dataFim : LocalDate
  - valor : BigDecimal
  - dataAssinatura : LocalDateTime
}

class ContratoCredito {
  - id : Long
  - valorFinanciado : BigDecimal
  - taxaJuros : BigDecimal
  - parcelas : Integer
  - emitidoEm : LocalDateTime
}

' ─── Config / Security (não são entidades JPA) ───────────
class JwtService <<@Service>> {
  + generateToken(userDetails, claims) : String
  + extractUsername(token) : String
  + isTokenValid(token, userDetails) : boolean
}

class UserDetailsServiceImpl <<@Service>> {
  + loadUserByUsername(username) : UserDetails
}

' ─── Relacionamentos ─────────────────────────────────────

Usuario "1" --o "0..1" Cliente    : <<OneToOne>>
Usuario "1" --o "0..1" Agente     : <<OneToOne>>

Cliente  "1" *-- "1..3" Rendimento : <<OneToMany, orphanRemoval>>

Cliente  "1" --o "0..*" PedidoAluguel  : solicita
Agente   "1" --o "0..*" PedidoAluguel  : agenteResponsavel

PedidoAluguel "1" --o "1"    Automovel      : refere-se a
PedidoAluguel "1" --o "0..1" ContratoAluguel : <<OneToOne>>

ContratoAluguel "1" --o "0..1" ContratoCredito : <<OneToOne, optional>>

Agente "1" --o "0..*" ContratoCredito : banco <<ManyToOne>>

PedidoAluguel --> StatusPedido
Usuario       --> RoleUsuario
Agente        --> TipoAgente
Automovel     --> TipoProprietario

UserDetailsServiceImpl ..> Usuario : carrega
JwtService             ..> UserDetailsServiceImpl : usa

@enduml
```
