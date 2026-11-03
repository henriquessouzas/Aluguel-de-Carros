import { useEffect, useState } from 'react'
import { listarAutomoveis, criarAutomovel, atualizarAutomovel, excluirAutomovel } from '../services/pedidoService'
import Modal from '../components/Modal'

const TIPOS = ['CLIENTE', 'EMPRESA', 'BANCO']
const formVazio = { matricula: '', ano: '', marca: '', modelo: '', placa: '', tipoProprietario: 'EMPRESA', proprietarioId: '' }

export default function Automoveis() {
  const [lista, setLista] = useState([])
  const [modal, setModal] = useState(null) // null | 'novo' | objeto
  const [form, setForm] = useState(formVazio)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { carregar() }, [])

  async function carregar() {
    const { data } = await listarAutomoveis()
    setLista(data)
  }

  function abrirNovo() {
    setForm(formVazio)
    setError('')
    setModal('novo')
  }

  function abrirEdicao(a) {
    setForm({ matricula: a.matricula, ano: String(a.ano), marca: a.marca, modelo: a.modelo, placa: a.placa, tipoProprietario: a.tipoProprietario, proprietarioId: String(a.proprietarioId) })
    setError('')
    setModal(a)
  }

  function setField(f, v) { setForm(prev => ({ ...prev, [f]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const payload = { ...form, ano: Number(form.ano), proprietarioId: Number(form.proprietarioId) }
    try {
      if (modal === 'novo') await criarAutomovel(payload)
      else await atualizarAutomovel(modal.id, payload)
      setModal(null)
      setSuccess(modal === 'novo' ? 'Automóvel cadastrado.' : 'Automóvel atualizado.')
      carregar()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar.')
    } finally {
      setLoading(false)
    }
  }

  async function handleExcluir(id) {
    if (!window.confirm('Excluir este automóvel?')) return
    try {
      await excluirAutomovel(id)
      setSuccess('Automóvel excluído.')
      carregar()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao excluir.')
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Automóveis</h2>
        <button onClick={abrirNovo}>+ Cadastrar</button>
      </div>

      {success && <p className="success">{success}</p>}
      {error && !modal && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Matrícula</th><th>Marca / Modelo</th><th>Ano</th><th>Placa</th><th>Proprietário</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map(a => (
              <tr key={a.id}>
                <td>{a.matricula}</td>
                <td>{a.marca} {a.modelo}</td>
                <td>{a.ano}</td>
                <td>{a.placa}</td>
                <td>{a.tipoProprietario} #{a.proprietarioId}</td>
                <td className="actions">
                  <button className="btn-secondary btn-sm" onClick={() => abrirEdicao(a)}>Editar</button>
                  <button className="btn-danger btn-sm" onClick={() => handleExcluir(a.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'novo' ? 'Novo Automóvel' : 'Editar Automóvel'} onClose={() => setModal(null)}>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">
              <label>Matrícula
                <input value={form.matricula} onChange={e => setField('matricula', e.target.value)} required />
              </label>
              <label>Placa
                <input value={form.placa} onChange={e => setField('placa', e.target.value)} required />
              </label>
              <label>Marca
                <input value={form.marca} onChange={e => setField('marca', e.target.value)} required />
              </label>
              <label>Modelo
                <input value={form.modelo} onChange={e => setField('modelo', e.target.value)} required />
              </label>
              <label>Ano
                <input type="number" value={form.ano} onChange={e => setField('ano', e.target.value)} required min="1900" max="2100" />
              </label>
              <label>Tipo de proprietário
                <select value={form.tipoProprietario} onChange={e => setField('tipoProprietario', e.target.value)}>
                  {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
              <label>ID do proprietário
                <input type="number" value={form.proprietarioId} onChange={e => setField('proprietarioId', e.target.value)} required />
              </label>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="form-actions">
              <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
              <button type="button" className="btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
