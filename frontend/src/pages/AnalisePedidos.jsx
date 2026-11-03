import { useEffect, useState } from 'react'
import {
  todosPedidos, modificarPedidoAgente,
  avaliarPedido, registrarContrato
} from '../services/pedidoService'
import StatusBadge from '../components/StatusBadge'
import Modal from '../components/Modal'

const fmt = (d) => d ? new Date(d).toLocaleDateString('pt-BR') : '—'
const fmtMoney = (v) => v != null ? `R$ ${Number(v).toFixed(2)}` : '—'

export default function AnalisePedidos() {
  const [pedidos, setPedidos] = useState([])
  const [filtro, setFiltro] = useState('TODOS')
  const [modal, setModal] = useState(null) // null | {tipo, pedido}
  const [form, setForm] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { carregar() }, [])

  async function carregar() {
    const { data } = await todosPedidos()
    setPedidos(data)
  }

  function setField(f, v) { setForm(prev => ({ ...prev, [f]: v })) }

  function abrirModificar(p) {
    setForm({ dataInicio: p.dataInicio, dataFim: p.dataFim, valor: p.valor ?? '', observacoes: p.observacoes ?? '' })
    setError('')
    setModal({ tipo: 'modificar', pedido: p })
  }

  function abrirAvaliar(p) {
    setForm({ parecer: 'APROVADO', justificativa: '' })
    setError('')
    setModal({ tipo: 'avaliar', pedido: p })
  }

  function abrirContrato(p) {
    setForm({ dataInicio: p.dataInicio, dataFim: p.dataFim, valor: p.valor ?? '', bancoId: '', valorFinanciado: '', taxaJuros: '', parcelas: '' })
    setError('')
    setModal({ tipo: 'contrato', pedido: p })
  }

  async function handleModificar(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await modificarPedidoAgente(modal.pedido.id, {
        dataInicio: form.dataInicio || null,
        dataFim: form.dataFim || null,
        valor: form.valor ? parseFloat(form.valor) : null,
        observacoes: form.observacoes || null,
      })
      setModal(null)
      setSuccess('Pedido atualizado.')
      carregar()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao modificar.')
    } finally {
      setLoading(false)
    }
  }

  async function handleAvaliar(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await avaliarPedido(modal.pedido.id, { parecer: form.parecer, justificativa: form.justificativa })
      setModal(null)
      setSuccess(`Pedido ${form.parecer === 'APROVADO' ? 'aprovado' : 'reprovado'}.`)
      carregar()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao avaliar.')
    } finally {
      setLoading(false)
    }
  }

  async function handleContrato(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        dataInicio: form.dataInicio,
        dataFim: form.dataFim,
        valor: parseFloat(form.valor),
        bancoId: form.bancoId ? Number(form.bancoId) : null,
        valorFinanciado: form.valorFinanciado ? parseFloat(form.valorFinanciado) : null,
        taxaJuros: form.taxaJuros ? parseFloat(form.taxaJuros) : null,
        parcelas: form.parcelas ? Number(form.parcelas) : null,
      }
      await registrarContrato(modal.pedido.id, payload)
      setModal(null)
      setSuccess('Contrato registrado. Pedido CONTRATADO.')
      carregar()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar contrato.')
    } finally {
      setLoading(false)
    }
  }

  const STATUS_FILTROS = ['TODOS', 'EM_ANALISE', 'APROVADO', 'REPROVADO', 'CANCELADO', 'CONTRATADO']
  const pedidosFiltrados = filtro === 'TODOS' ? pedidos : pedidos.filter(p => p.status === filtro)

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Análise de Pedidos</h2>
      </div>

      {success && <p className="success">{success}</p>}
      {error && !modal && <p className="error">{error}</p>}

      <div className="filter-bar">
        {STATUS_FILTROS.map(s => (
          <button key={s} className={`btn-filter ${filtro === s ? 'active' : ''}`} onClick={() => setFiltro(s)}>
            {s === 'TODOS' ? 'Todos' : <StatusBadge status={s} />}
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>#</th><th>Cliente</th><th>Automóvel</th><th>Período</th><th>Valor</th><th>Status</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.clienteNome}</td>
                <td>{p.automovelDescricao}</td>
                <td>{fmt(p.dataInicio)} → {fmt(p.dataFim)}</td>
                <td>{fmtMoney(p.valor)}</td>
                <td><StatusBadge status={p.status} /></td>
                <td className="actions">
                  {p.status === 'EM_ANALISE' && (
                    <>
                      <button className="btn-secondary btn-sm" onClick={() => abrirModificar(p)}>Modificar</button>
                      <button className="btn-sm" onClick={() => abrirAvaliar(p)}>Avaliar</button>
                    </>
                  )}
                  {p.status === 'APROVADO' && (
                    <button className="btn-sm" onClick={() => abrirContrato(p)}>Contrato</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Modificar */}
      {modal?.tipo === 'modificar' && (
        <Modal title={`Modificar Pedido #${modal.pedido.id}`} onClose={() => setModal(null)}>
          <form onSubmit={handleModificar} className="form">
            <div className="form-grid">
              <label>Data de início
                <input type="date" value={form.dataInicio} onChange={e => setField('dataInicio', e.target.value)} />
              </label>
              <label>Data de fim
                <input type="date" value={form.dataFim} onChange={e => setField('dataFim', e.target.value)} />
              </label>
              <label>Valor (R$)
                <input type="number" step="0.01" value={form.valor} onChange={e => setField('valor', e.target.value)} />
              </label>
            </div>
            <label>Observações
              <textarea value={form.observacoes} onChange={e => setField('observacoes', e.target.value)} rows={3} />
            </label>
            {error && <p className="error">{error}</p>}
            <div className="form-actions">
              <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
              <button type="button" className="btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal Avaliar */}
      {modal?.tipo === 'avaliar' && (
        <Modal title={`Avaliar Pedido #${modal.pedido.id} — ${modal.pedido.clienteNome}`} onClose={() => setModal(null)}>
          <form onSubmit={handleAvaliar} className="form">
            <label>Parecer
              <select value={form.parecer} onChange={e => setField('parecer', e.target.value)}>
                <option value="APROVADO">✅ Aprovado</option>
                <option value="REPROVADO">❌ Reprovado</option>
              </select>
            </label>
            <label>Justificativa
              <textarea value={form.justificativa} onChange={e => setField('justificativa', e.target.value)} rows={4} required placeholder="Descreva o parecer financeiro..." />
            </label>
            {error && <p className="error">{error}</p>}
            <div className="form-actions">
              <button type="submit" disabled={loading} className={form.parecer === 'APROVADO' ? '' : 'btn-danger'}>
                {loading ? 'Enviando...' : form.parecer === 'APROVADO' ? 'Aprovar' : 'Reprovar'}
              </button>
              <button type="button" className="btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal Contrato */}
      {modal?.tipo === 'contrato' && (
        <Modal title={`Registrar Contrato — Pedido #${modal.pedido.id}`} onClose={() => setModal(null)}>
          <form onSubmit={handleContrato} className="form">
            <div className="form-grid">
              <label>Data de início
                <input type="date" value={form.dataInicio} onChange={e => setField('dataInicio', e.target.value)} required />
              </label>
              <label>Data de fim
                <input type="date" value={form.dataFim} onChange={e => setField('dataFim', e.target.value)} required />
              </label>
              <label>Valor total (R$)
                <input type="number" step="0.01" min="0.01" value={form.valor} onChange={e => setField('valor', e.target.value)} required />
              </label>
            </div>

            <div className="section-title"><span>Contrato de Crédito (opcional)</span></div>
            <div className="form-grid">
              <label>ID do Banco
                <input type="number" value={form.bancoId} onChange={e => setField('bancoId', e.target.value)} placeholder="ID do agente banco" />
              </label>
              <label>Valor financiado (R$)
                <input type="number" step="0.01" value={form.valorFinanciado} onChange={e => setField('valorFinanciado', e.target.value)} />
              </label>
              <label>Taxa de juros (%)
                <input type="number" step="0.01" value={form.taxaJuros} onChange={e => setField('taxaJuros', e.target.value)} />
              </label>
              <label>Parcelas
                <input type="number" min="1" value={form.parcelas} onChange={e => setField('parcelas', e.target.value)} />
              </label>
            </div>

            {error && <p className="error">{error}</p>}
            <div className="form-actions">
              <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrar Contrato'}</button>
              <button type="button" className="btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
