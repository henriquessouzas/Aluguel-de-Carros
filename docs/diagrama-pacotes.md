# Diagrama de Pacotes — Sistema de Aluguel de Carros

> Arquivo fonte: [`/docs/diagramas/diagrama-pacotes.puml`](diagramas/diagrama-pacotes.puml)

```plantuml
@startuml diagrama-pacotes
skinparam packageStyle rectangle
skinparam linetype ortho

' ─── Backend ─────────────────────────────────────────────
package "backend" {

  package "config" {
  }

  package "exception" {
  }

  package "model" {
  }

  package "dto" {
  }

  package "repository" {
  }

  package "service" {
  }

  package "controller" {
  }

}

' ─── Frontend ────────────────────────────────────────────
package "frontend" {

  package "services" {
  }

  package "components" {
  }

  package "pages" {
  }

}

' ─── Dependências Backend ────────────────────────────────
controller  ..> service    : usa
controller  ..> dto        : usa
service     ..> repository : usa
service     ..> model      : usa
service     ..> dto        : usa
service     ..> exception  : lança
repository  ..> model      : persiste
config      ..> service    : configura
config      ..> exception  : configura

' ─── Dependências Frontend ───────────────────────────────
pages      ..> components : renderiza
pages      ..> services   : consome
components ..> services   : consome

' ─── Integração ──────────────────────────────────────────
services ..> controller : "HTTP/REST"

@enduml
```
