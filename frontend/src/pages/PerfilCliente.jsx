import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe, updateMe, deleteMe } from '../services/clienteService'
import { useAuth } from '../context/AuthContext'

const rendimentoVazio = { entidadeEmpregadora: '', valor: '' }

export default function PerfilCliente() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMe().then(({ data }) => {
      setCliente(data)
      setForm(toForm(data))
    })
  }, [])

  function toForm(data) {
    return {
      nome: data.nome,
      endereco: data.endereco,
      profissao: data.profissao,
      rendimentos: data.rendimentos.map(r => ({
        entidadeEmpregadora: r.entidadeEmpregadora,
        valor: String(r.valor),
      })),
    }
  }

  function setField(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function setRendimento(i, field, value) {
    setForm(f => ({
      ...f,
      rendimentos: f.rendimentos.map((r, idx) => idx === i ? { ...r, [field]: value } : r),
    }))
  }

  function addRendimento() {
    if (form.rendimentos.length < 3)
      setForm(f => ({ ...f, rendimentos: [...f.rendimentos, { ...rendimentoVazio }] }))
  }

  function removeRendimento(i) {
    if (form.rendimentos.length > 1)
      setForm(f => ({ ...f, rendimentos: f.rendimentos.filter((_, idx) => idx !== i) }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const payload = {
        ...form,
        rendimentos: form.rendimentos.map(r => ({ ...r, valor: parseFloat(r.valor) })),
      }
      const { data } = await updateMe(payload)
      setCliente(data)
      setForm(toForm(data))
      setEditing(false)
      setSuccess('Perfil atualizado com sucesso.')
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) return
    try {
      await deleteMe()
      logout()
      navigate('/login')
    } catch {
      setError('Erro ao excluir conta.')
    }
  }

  if (!cliente) return <div className="page-center"><p>Carregando...</p></div>

  return (
    <div className="page-center">
      <div className="card card-wide">
        <div className="card-header">
          <h2>Meu Perfil</h2>
          {!editing && (
            <button className="btn-secondary" onClick={() => { setEditing(true); setSuccess('') }}>
              Editar
            </button>
          )}
        </div>

        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}

        {!editing ? (
          <div className="info-grid">
            <div className="info-item"><span>Usuário</span><strong>{cliente.username}</strong></div>
            <div className="info-item"><span>Nome</span><strong>{cliente.nome}</strong></div>
            <div className="info-item"><span>CPF</span><strong>{cliente.cpf}</strong></div>
            <div className="info-item"><span>RG</span><strong>{cliente.rg}</strong></div>
            <div className="info-item"><span>Profissão</span><strong>{cliente.profissao}</strong></div>
            <div className="info-item full-width"><span>Endereço</span><strong>{cliente.endereco}</strong></div>
            <div className="info-item full-width">
              <span>Rendimentos</span>
              <ul className="rendimentos-list">
                {cliente.rendimentos.map((r, i) => (
                  <li key={i}>{r.entidadeEmpregadora} — R$ {Number(r.valor).toFixed(2)}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="form">
            <div className="form-grid">
              <label>Nome
                <input value={form.nome} onChange={e => setField('nome', e.target.value)} required />
              </label>
              <label>Profissão
                <input value={form.profissao} onChange={e => setField('profissao', e.target.value)} required />
              </label>
              <label className="full-width">Endereço
                <input value={form.endereco} onChange={e => setField('endereco', e.target.value)} required />
              </label>
            </div>

            <div className="section-title">
              <span>Rendimentos</span>
              {form.rendimentos.length < 3 && (
                <button type="button" className="btn-secondary btn-sm" onClick={addRendimento}>+ Adicionar</button>
              )}
            </div>

            {form.rendimentos.map((r, i) => (
              <div key={i} className="rendimento-row">
                <label>Entidade empregadora
                  <input value={r.entidadeEmpregadora} onChange={e => setRendimento(i, 'entidadeEmpregadora', e.target.value)} required />
                </label>
                <label>Valor (R$)
                  <input type="number" step="0.01" min="0.01" value={r.valor} onChange={e => setRendimento(i, 'valor', e.target.value)} required />
                </label>
                {form.rendimentos.length > 1 && (
                  <button type="button" className="btn-danger btn-sm" onClick={() => removeRendimento(i)}>✕</button>
                )}
              </div>
            ))}

            <div className="form-actions">
              <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
              <button type="button" className="btn-secondary" onClick={() => { setEditing(false); setForm(toForm(cliente)); setError('') }}>
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="danger-zone">
          <button className="btn-danger" onClick={handleDelete}>Excluir minha conta</button>
        </div>
      </div>
    </div>
  )
}
