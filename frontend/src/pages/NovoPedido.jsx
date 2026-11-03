import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listarAutomoveis, criarPedido } from '../services/pedidoService'

export default function NovoPedido() {
  const navigate = useNavigate()
  const [automoveis, setAutomoveis] = useState([])
  const [form, setForm] = useState({ automovelId: '', dataInicio: '', dataFim: '', valor: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    listarAutomoveis().then(({ data }) => setAutomoveis(data))
  }, [])

  function setField(f, v) { setForm(prev => ({ ...prev, [f]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await criarPedido({
        automovelId: Number(form.automovelId),
        dataInicio: form.dataInicio,
        dataFim: form.dataFim,
        valor: form.valor ? parseFloat(form.valor) : null,
      })
      navigate('/pedidos')
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar pedido.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-center">
      <div className="card card-wide">
        <h2>Novo Pedido de Aluguel</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>Automóvel
            <select value={form.automovelId} onChange={e => setField('automovelId', e.target.value)} required>
              <option value="">Selecione...</option>
              {automoveis.map(a => (
                <option key={a.id} value={a.id}>
                  {a.marca} {a.modelo} — {a.placa} ({a.ano})
                </option>
              ))}
            </select>
          </label>
          <div className="form-grid">
            <label>Data de início
              <input type="date" value={form.dataInicio} onChange={e => setField('dataInicio', e.target.value)} required />
            </label>
            <label>Data de fim
              <input type="date" value={form.dataFim} onChange={e => setField('dataFim', e.target.value)} required />
            </label>
            <label>Valor estimado (R$)
              <input type="number" step="0.01" min="0" value={form.valor} onChange={e => setField('valor', e.target.value)} placeholder="Opcional" />
            </label>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="form-actions">
            <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Criar Pedido'}</button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/pedidos')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
