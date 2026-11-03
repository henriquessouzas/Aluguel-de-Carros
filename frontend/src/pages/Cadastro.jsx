import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerCliente } from '../services/clienteService'
import { useAuth } from '../context/AuthContext'

const rendimentoVazio = { entidadeEmpregadora: '', valor: '' }

export default function Cadastro() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '', senha: '', rg: '', cpf: '',
    nome: '', endereco: '', profissao: '',
  })
  const [rendimentos, setRendimentos] = useState([{ ...rendimentoVazio }])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function setField(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function setRendimento(i, field, value) {
    setRendimentos(r => r.map((item, idx) => idx === i ? { ...item, [field]: value } : item))
  }

  function addRendimento() {
    if (rendimentos.length < 3) setRendimentos(r => [...r, { ...rendimentoVazio }])
  }

  function removeRendimento(i) {
    if (rendimentos.length > 1) setRendimentos(r => r.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await registerCliente({ ...form, rendimentos })
      await login(form.username, form.senha)
      navigate('/perfil')
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-center">
      <div className="card card-wide">
        <h2>Cadastro de Cliente</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-grid">
            <label>Usuário
              <input value={form.username} onChange={e => setField('username', e.target.value)} required />
            </label>
            <label>Senha
              <input type="password" value={form.senha} onChange={e => setField('senha', e.target.value)} required minLength={6} />
            </label>
            <label>Nome completo
              <input value={form.nome} onChange={e => setField('nome', e.target.value)} required />
            </label>
            <label>CPF
              <input value={form.cpf} onChange={e => setField('cpf', e.target.value)} required placeholder="000.000.000-00" />
            </label>
            <label>RG
              <input value={form.rg} onChange={e => setField('rg', e.target.value)} required />
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
            {rendimentos.length < 3 && (
              <button type="button" className="btn-secondary btn-sm" onClick={addRendimento}>+ Adicionar</button>
            )}
          </div>

          {rendimentos.map((r, i) => (
            <div key={i} className="rendimento-row">
              <label>Entidade empregadora
                <input value={r.entidadeEmpregadora} onChange={e => setRendimento(i, 'entidadeEmpregadora', e.target.value)} required />
              </label>
              <label>Valor (R$)
                <input type="number" step="0.01" min="0.01" value={r.valor} onChange={e => setRendimento(i, 'valor', e.target.value)} required />
              </label>
              {rendimentos.length > 1 && (
                <button type="button" className="btn-danger btn-sm" onClick={() => removeRendimento(i)}>✕</button>
              )}
            </div>
          ))}

          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
        </form>
        <p className="form-footer">Já tem conta? <Link to="/login">Entrar</Link></p>
      </div>
    </div>
  )
}
