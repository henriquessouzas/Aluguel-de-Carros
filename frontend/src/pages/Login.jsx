import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', senha: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const role = await login(form.username, form.senha)
      navigate(role === 'CLIENTE' ? '/perfil' : '/clientes')
    } catch {
      setError('Usuário ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-center">
      <div className="card">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>Usuário
            <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
          </label>
          <label>Senha
            <input type="password" value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })} required />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
        <p className="form-footer">Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
      </div>
    </div>
  )
}
