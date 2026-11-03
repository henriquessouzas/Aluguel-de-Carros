import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import PerfilCliente from './pages/PerfilCliente'
import MeusPedidos from './pages/MeusPedidos'
import NovoPedido from './pages/NovoPedido'
import Automoveis from './pages/Automoveis'
import AnalisePedidos from './pages/AnalisePedidos'

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
              <PrivateRoute role="CLIENTE"><PerfilCliente /></PrivateRoute>
            } />
            <Route path="/pedidos" element={
              <PrivateRoute role="CLIENTE"><MeusPedidos /></PrivateRoute>
            } />
            <Route path="/pedidos/novo" element={
              <PrivateRoute role="CLIENTE"><NovoPedido /></PrivateRoute>
            } />
            <Route path="/automoveis" element={
              <PrivateRoute><Automoveis /></PrivateRoute>
            } />
            <Route path="/analise" element={
              <PrivateRoute role="AGENTE"><AnalisePedidos /></PrivateRoute>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}
