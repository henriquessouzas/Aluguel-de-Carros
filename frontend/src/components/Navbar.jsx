import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🚗 Aluguel de Carros</Link>
      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/cadastro">Cadastrar</Link>
          </>
        )}
        {user?.role === 'CLIENTE' && (
          <>
            <Link to="/perfil">Meu Perfil</Link>
            <Link to="/pedidos">Meus Pedidos</Link>
            <Link to="/automoveis">Automóveis</Link>
          </>
        )}
        {user?.role === 'AGENTE' && (
          <>
            <Link to="/automoveis">Automóveis</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/analise">Análise de Pedidos</Link>
          </>
        )}
        {user && (
          <button onClick={handleLogout} className="btn-link">Sair</button>
        )}
      </div>
    </nav>
  )
}
