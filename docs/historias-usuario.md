# Histórias de Usuário — Sistema de Aluguel de Carros

---

## HU-01 — Cadastro de Cliente

**Como** cliente, **quero** me cadastrar no sistema informando meus dados pessoais e rendimentos, **para** poder solicitar aluguéis de automóveis.

**Critérios de aceite:**
- Campos obrigatórios: RG, CPF, nome completo, endereço, profissão e pelo menos 1 rendimento.
- CPF deve ser único no sistema e validado (formato e dígitos verificadores).
- É possível cadastrar até 3 rendimentos (entidade empregadora + valor).
- Após o cadastro, o sistema cria automaticamente as credenciais de acesso (usuário/senha).

---

## HU-02 — Autenticação

**Como** usuário (cliente ou agente), **quero** fazer login com usuário e senha, **para** acessar as funcionalidades do sistema de forma segura.

**Critérios de aceite:**
- Credenciais inválidas retornam mensagem de erro sem revelar qual campo está incorreto.
- Sessão autenticada via JWT com expiração configurável.
- Logout encerra a sessão imediatamente.

---

## HU-03 — Gerenciamento de Perfil

**Como** cliente, **quero** visualizar e editar meus dados cadastrais, **para** mantê-los atualizados.

**Critérios de aceite:**
- Cliente pode alterar endereço, profissão e rendimentos.
- CPF e RG não podem ser alterados após o cadastro.
- Alterações são salvas imediatamente e refletidas em novos pedidos.

---

## HU-04 — Criação de Pedido de Aluguel

**Como** cliente, **quero** criar um pedido de aluguel selecionando um automóvel e o período desejado, **para** iniciar o processo de locação.

**Critérios de aceite:**
- Cliente seleciona automóvel disponível (não associado a contrato ativo).
- Pedido criado com status inicial `EM_ANALISE`.
- Sistema registra data/hora de criação do pedido.

---

## HU-05 — Consulta de Pedidos

**Como** cliente, **quero** consultar meus pedidos de aluguel, **para** acompanhar o status de cada solicitação.

**Critérios de aceite:**
- Lista exibe todos os pedidos do cliente autenticado com status atual.
- É possível filtrar por status (EM_ANALISE, APROVADO, REPROVADO, CANCELADO, CONTRATADO).
- Detalhe do pedido exibe dados do automóvel, período e histórico de alterações.

---

## HU-06 — Cancelamento de Pedido

**Como** cliente, **quero** cancelar um pedido de aluguel, **para** desistir de uma solicitação que não desejo mais.

**Critérios de aceite:**
- Cancelamento permitido apenas para pedidos com status `EM_ANALISE` ou `APROVADO`.
- Pedidos com status `CONTRATADO` não podem ser cancelados por esta funcionalidade.
- Status atualizado para `CANCELADO` com registro de data/hora.

---

## HU-07 — Modificação de Pedido pelo Cliente

**Como** cliente, **quero** modificar os dados de um pedido em análise, **para** corrigir informações ou ajustar o período de aluguel.

**Critérios de aceite:**
- Modificação permitida apenas para pedidos com status `EM_ANALISE`.
- Cliente pode alterar período e automóvel selecionado.
- Alteração registra data/hora da última modificação.

---

## HU-08 — Avaliação Financeira pelo Agente

**Como** agente, **quero** avaliar pedidos de aluguel realizando análise financeira, **para** aprovar ou reprovar solicitações com base na capacidade financeira do cliente.

**Critérios de aceite:**
- Agente visualiza dados financeiros do cliente (rendimentos, profissão).
- Agente emite parecer: `APROVADO` ou `REPROVADO` com justificativa obrigatória.
- Pedidos `APROVADO` ficam disponíveis para registro de contrato.
- Pedidos `REPROVADO` notificam o cliente.

---

## HU-09 — Registro de Contrato de Aluguel

**Como** agente, **quero** registrar o contrato de aluguel de um pedido aprovado, **para** formalizar a locação do automóvel.

**Critérios de aceite:**
- Contrato só pode ser registrado para pedidos com status `APROVADO`.
- Contrato registra: data de início, data de fim, valor total e dados do automóvel.
- Após registro, status do pedido muda para `CONTRATADO`.
- Automóvel vinculado ao contrato fica indisponível para novos pedidos.

---

## HU-10 — Associação de Contrato de Crédito

**Como** agente do tipo banco, **quero** associar um contrato de crédito a um contrato de aluguel, **para** oferecer financiamento ao cliente locatário.

**Critérios de aceite:**
- Apenas agentes do tipo `BANCO` podem associar contratos de crédito.
- Contrato de crédito vincula banco concedente, valor financiado e condições.
- Um contrato de aluguel pode ter no máximo um contrato de crédito associado.

---

## HU-11 — Modificação de Pedido pelo Agente

**Como** agente, **quero** modificar condições de um pedido durante a análise, **para** ajustar termos antes de emitir o parecer final.

**Critérios de aceite:**
- Agente pode alterar observações e condições do pedido com status `EM_ANALISE`.
- Modificações ficam registradas com identificação do agente e data/hora.
- Cliente é notificado sobre alterações realizadas pelo agente.

---

## HU-12 — Cadastro de Automóvel

**Como** agente, **quero** cadastrar automóveis no sistema, **para** disponibilizá-los para pedidos de aluguel.

**Critérios de aceite:**
- Campos obrigatórios: matrícula, ano, marca, modelo e placa.
- Placa deve ser única no sistema.
- Proprietário pode ser cliente, empresa ou banco conforme o tipo de contrato.
