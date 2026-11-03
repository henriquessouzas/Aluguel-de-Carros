import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import PerfilCliente from './pages/PerfilCliente'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/perfil" element={
              <PrivateRoute role="CLIENTE">
                <PerfilCliente />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}
