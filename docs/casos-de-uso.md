# Casos de Uso — Sistema de Aluguel de Carros

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

  usecase "Cadastrar-se" as UC01
  usecase "Autenticar" as UC02
  usecase "Gerenciar Perfil\n(CRUD)" as UC03
  usecase "Criar Pedido\nde Aluguel" as UC04
  usecase "Modificar Pedido\n(Cliente)" as UC05
  usecase "Consultar Pedido" as UC06
  usecase "Cancelar Pedido" as UC07
  usecase "Avaliar Pedido\n(Análise Financeira)" as UC08
  usecase "Modificar Pedido\n(Agente)" as UC09
  usecase "Registrar Contrato\nde Aluguel" as UC10
  usecase "Associar Contrato\nde Crédito" as UC11

}

Cliente --> UC01
Cliente --> UC02
Cliente --> UC03
Cliente --> UC04
Cliente --> UC05
Cliente --> UC06
Cliente --> UC07

Agente --> UC02
Agente --> UC08
Agente --> UC09
Agente --> UC10
Agente --> UC11

UC04 ..> UC02 : <<include>>
UC05 ..> UC02 : <<include>>
UC06 ..> UC02 : <<include>>
UC07 ..> UC02 : <<include>>
UC08 ..> UC02 : <<include>>
UC09 ..> UC02 : <<include>>
UC10 ..> UC02 : <<include>>

UC10 ..> UC08 : <<include>>
UC11 ..> UC10 : <<extend>>

@enduml
```

## Descrição dos Casos de Uso

| ID | Caso de Uso | Ator Principal | Descrição |
|----|-------------|----------------|-----------|
| UC01 | Cadastrar-se | Cliente | Cria conta informando dados pessoais (RG, CPF, nome, endereço, profissão, rendimentos) |
| UC02 | Autenticar | Cliente / Agente | Login com usuário e senha |
| UC03 | Gerenciar Perfil | Cliente | Visualiza, edita e exclui seus dados cadastrais e rendimentos |
| UC04 | Criar Pedido de Aluguel | Cliente | Abre novo pedido selecionando automóvel e período desejado |
| UC05 | Modificar Pedido (Cliente) | Cliente | Altera dados do pedido enquanto em status EM_ANALISE |
| UC06 | Consultar Pedido | Cliente | Lista e detalha seus pedidos de aluguel |
| UC07 | Cancelar Pedido | Cliente | Cancela pedido com status EM_ANALISE ou APROVADO |
| UC08 | Avaliar Pedido | Agente | Realiza análise financeira e emite parecer (APROVADO / REPROVADO) |
| UC09 | Modificar Pedido (Agente) | Agente | Ajusta condições do pedido durante a análise |
| UC10 | Registrar Contrato de Aluguel | Agente | Formaliza contrato após aprovação do pedido |
| UC11 | Associar Contrato de Crédito | Agente (Banco) | Vincula financiamento bancário ao contrato de aluguel |
