import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { meusPedidos, modificarPedido, cancelarPedido } from '../services/pedidoService'
import { listarAutomoveis } from '../services/pedidoService'
import StatusBadge from '../components/StatusBadge'
import Modal from '../components/Modal'

const fmt = (d) => d ? new Date(d).toLocaleDateString('pt-BR') : '—'
const fmtMoney = (v) => v != null ? `R$ ${Number(v).toFixed(2)}` : '—'

export default function MeusPedidos() {
  const navigate = useNavigate()
  const [pedidos, setPedidos] = useState([])
  const [automoveis, setAutomoveis] = useState([])
  const [detalhe, setDetalhe] = useState(null)
  const [editando, setEditando] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    carregar()
    listarAutomoveis().then(({ data }) => setAutomoveis(data))
  }, [])

  async function carregar() {
    const { data } = await meusPedidos()
    setPedidos(data)
  }

  function abrirEdicao(p) {
    setEditando(p)
    setEditForm({
      automovelId: p.automovelId,
      dataInicio: p.dataInicio,
      dataFim: p.dataFim,
      valor: p.valor ?? '',
    })
    setError('')
  }

  async function salvarEdicao(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await modificarPedido(editando.id, {
        automovelId: Number(editForm.automovelId),
        dataInicio: editForm.dataInicio,
        dataFim: editForm.dataFim,
        valor: editForm.valor ? parseFloat(editForm.valor) : null,
      })
      setEditando(null)
      setSuccess('Pedido atualizado.')
      carregar()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCancelar(id) {
    if (!window.confirm('Cancelar este pedido?')) return
    try {
      await cancelarPedido(id)
      setSuccess('Pedido cancelado.')
      carregar()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cancelar.')
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Meus Pedidos</h2>
        <button onClick={() => navigate('/pedidos/novo')}>+ Novo Pedido</button>
      </div>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      {pedidos.length === 0 ? (
        <p className="text-muted">Nenhum pedido encontrado.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Automóvel</th>
                <th>Período</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.automovelDescricao}</td>
                  <td>{fmt(p.dataInicio)} → {fmt(p.dataFim)}</td>
                  <td>{fmtMoney(p.valor)}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td className="actions">
                    <button className="btn-secondary btn-sm" onClick={() => setDetalhe(p)}>Ver</button>
                    {p.status === 'EM_ANALISE' && (
                      <button className="btn-secondary btn-sm" onClick={() => abrirEdicao(p)}>Editar</button>
                    )}
                    {(p.status === 'EM_ANALISE' || p.status === 'APROVADO') && (
                      <button className="btn-danger btn-sm" onClick={() => handleCancelar(p.id)}>Cancelar</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {detalhe && (
        <Modal title={`Pedido #${detalhe.id}`} onClose={() => setDetalhe(null)}>
          <div className="info-grid">
            <div className="info-item"><span>Automóvel</span><strong>{detalhe.automovelDescricao}</strong></div>
            <div className="info-item"><span>Status</span><StatusBadge status={detalhe.status} /></div>
            <div className="info-item"><span>Início</span><strong>{fmt(detalhe.dataInicio)}</strong></div>
            <div className="info-item"><span>Fim</span><strong>{fmt(detalhe.dataFim)}</strong></div>
            <div className="info-item"><span>Valor</span><strong>{fmtMoney(detalhe.valor)}</strong></div>
            <div className="info-item"><span>Criado em</span><strong>{fmt(detalhe.criadoEm)}</strong></div>
            {detalhe.parecerFinanceiro && (
              <div className="info-item full-width"><span>Parecer</span><strong>{detalhe.parecerFinanceiro}</strong></div>
            )}
            {detalhe.observacoes && (
              <div className="info-item full-width"><span>Observações</span><strong>{detalhe.observacoes}</strong></div>
            )}
          </div>
        </Modal>
      )}

      {editando && (
        <Modal title={`Editar Pedido #${editando.id}`} onClose={() => setEditando(null)}>
          <form onSubmit={salvarEdicao} className="form">
            <label>Automóvel
              <select value={editForm.automovelId} onChange={e => setEditForm(f => ({ ...f, automovelId: e.target.value }))} required>
                {automoveis.map(a => (
                  <option key={a.id} value={a.id}>{a.marca} {a.modelo} — {a.placa}</option>
                ))}
              </select>
            </label>
            <div className="form-grid">
              <label>Data de início
                <input type="date" value={editForm.dataInicio} onChange={e => setEditForm(f => ({ ...f, dataInicio: e.target.value }))} required />
              </label>
              <label>Data de fim
                <input type="date" value={editForm.dataFim} onChange={e => setEditForm(f => ({ ...f, dataFim: e.target.value }))} required />
              </label>
              <label>Valor (R$)
                <input type="number" step="0.01" value={editForm.valor} onChange={e => setEditForm(f => ({ ...f, valor: e.target.value }))} />
              </label>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="form-actions">
              <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
              <button type="button" className="btn-secondary" onClick={() => setEditando(null)}>Cancelar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
