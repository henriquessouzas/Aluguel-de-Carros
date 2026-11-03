import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'CLIENTE') navigate('/perfil')
    else if (user?.role === 'AGENTE') navigate('/clientes')
  }, [user, navigate])

  return (
    <div className="page-center">
      <div className="card">
        <h2>Sistema de Aluguel de Carros</h2>
        <p>Bem-vindo! Faça login para continuar.</p>
      </div>
    </div>
  )
}
