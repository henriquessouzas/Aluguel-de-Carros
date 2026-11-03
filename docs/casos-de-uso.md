# Casos de Uso — Sistema de Aluguel de Carros

> Arquivo fonte: [`/docs/diagramas/casos-de-uso.puml`](diagramas/casos-de-uso.puml)

## Atores

| Ator | Descrição |
|------|-----------|
| **Cliente** | Pessoa física que solicita aluguéis de automóveis |
| **Agente** | Empresa ou banco que analisa e aprova pedidos de aluguel |

## Diagrama

```plantuml
@startuml casos-de-uso

left to right direction
skinparam packageStyle rectangle

actor Cliente
actor "Agente\n(Empresa/Banco)" as Agente

rectangle "Sistema de Aluguel de Carros" {

  usecase "Cadastrar-se\nPOST /auth/register" as UC01
  usecase "Cadastrar Agente\nPOST /auth/register-agente" as UC02
  usecase "Autenticar\nPOST /auth/login" as UC03
  usecase "Consultar Perfil\nGET /clientes/me" as UC04
  usecase "Editar Perfil\nPUT /clientes/me" as UC05
  usecase "Excluir Conta\nDELETE /clientes/me" as UC06
  usecase "Listar Clientes\nGET /clientes" as UC07
  usecase "Consultar Cliente\nGET /clientes/{id}" as UC08
  usecase "Listar Automóveis\nGET /automoveis" as UC09
  usecase "Gerenciar Automóvel\nPOST/PUT/DELETE /automoveis" as UC10
  usecase "Criar Pedido\nPOST /pedidos" as UC11
  usecase "Listar Meus Pedidos\nGET /pedidos" as UC12
  usecase "Modificar Pedido\nPUT /pedidos/{id}" as UC13
  usecase "Cancelar Pedido\nPATCH /pedidos/{id}/cancelar" as UC14
  usecase "Listar Todos Pedidos\nGET /pedidos/todos" as UC15
  usecase "Modificar Pedido (Agente)\nPUT /pedidos/{id}/agente" as UC16
  usecase "Avaliar Pedido\nPATCH /pedidos/{id}/avaliar" as UC17
  usecase "Registrar Contrato\nPOST /pedidos/{id}/contrato" as UC18

}

Cliente --> UC01
Cliente --> UC03
Cliente --> UC04
Cliente --> UC05
Cliente --> UC06
Cliente --> UC09
Cliente --> UC10
Cliente --> UC11
Cliente --> UC12
Cliente --> UC13
Cliente --> UC14

Agente --> UC02
Agente --> UC03
Agente --> UC07
Agente --> UC08
Agente --> UC09
Agente --> UC10
Agente --> UC15
Agente --> UC16
Agente --> UC17
Agente --> UC18

UC04 ..> UC03 : <<include>>
UC05 ..> UC03 : <<include>>
UC11 ..> UC03 : <<include>>
UC17 ..> UC03 : <<include>>
UC18 ..> UC17 : <<include>>

@enduml
```

## Descrição dos Casos de Uso

| ID | Endpoint | Método | Role | Descrição |
|----|----------|--------|------|-----------|
| UC01 | `/api/auth/register` | POST | público | Cadastro de cliente com dados pessoais e credenciais |
| UC02 | `/api/auth/register-agente` | POST | público | Cadastro de agente (empresa ou banco) |
| UC03 | `/api/auth/login` | POST | público | Login — retorna JWT + role |
| UC04 | `/api/clientes/me` | GET | CLIENTE | Consulta próprio perfil |
| UC05 | `/api/clientes/me` | PUT | CLIENTE | Atualiza nome, endereço, profissão e rendimentos |
| UC06 | `/api/clientes/me` | DELETE | CLIENTE | Exclui conta e usuário vinculado |
| UC07 | `/api/clientes` | GET | AGENTE | Lista todos os clientes cadastrados |
| UC08 | `/api/clientes/{id}` | GET | AGENTE | Consulta cliente por ID |
| UC09 | `/api/automoveis` | GET | autenticado | Lista automóveis disponíveis |
| UC10 | `/api/automoveis` | POST/PUT/DELETE | AGENTE ou CLIENTE proprietário | CRUD de automóveis |
| UC11 | `/api/pedidos` | POST | CLIENTE | Cria pedido com status EM_ANALISE |
| UC12 | `/api/pedidos` | GET | CLIENTE | Lista pedidos do cliente logado |
| UC13 | `/api/pedidos/{id}` | PUT | CLIENTE | Modifica pedido (apenas EM_ANALISE) |
| UC14 | `/api/pedidos/{id}/cancelar` | PATCH | CLIENTE | Cancela pedido (EM_ANALISE ou APROVADO) |
| UC15 | `/api/pedidos/todos` | GET | AGENTE | Lista todos os pedidos do sistema |
| UC16 | `/api/pedidos/{id}/agente` | PUT | AGENTE | Modifica condições do pedido durante análise |
| UC17 | `/api/pedidos/{id}/avaliar` | PATCH | AGENTE | Emite parecer APROVADO ou REPROVADO com justificativa |
| UC18 | `/api/pedidos/{id}/contrato` | POST | AGENTE | Registra contrato de aluguel (status → CONTRATADO) com crédito opcional |
