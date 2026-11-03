const CORES = {
  EM_ANALISE: 'badge-analise',
  APROVADO: 'badge-aprovado',
  REPROVADO: 'badge-reprovado',
  CANCELADO: 'badge-cancelado',
  CONTRATADO: 'badge-contratado',
}

const LABELS = {
  EM_ANALISE: 'Em Análise',
  APROVADO: 'Aprovado',
  REPROVADO: 'Reprovado',
  CANCELADO: 'Cancelado',
  CONTRATADO: 'Contratado',
}

export default function StatusBadge({ status }) {
  return <span className={`badge ${CORES[status] ?? ''}`}>{LABELS[status] ?? status}</span>
}
