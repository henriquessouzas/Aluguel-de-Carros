import { createContext, useContext, useState } from 'react'
import { login as loginApi } from '../services/clienteService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const username = localStorage.getItem('username')
    return token ? { token, role, username } : null
  })

  async function login(username, senha) {
    const { data } = await loginApi({ username, senha })
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    localStorage.setItem('username', data.username)
    setUser({ token: data.token, role: data.role, username: data.username })
    return data.role
  }

  function logout() {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
