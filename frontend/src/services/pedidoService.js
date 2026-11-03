import api from './api'

export const listarAutomoveis = () => api.get('/automoveis')
export const criarAutomovel = (data) => api.post('/automoveis', data)
export const atualizarAutomovel = (id, data) => api.put(`/automoveis/${id}`, data)
export const excluirAutomovel = (id) => api.delete(`/automoveis/${id}`)

export const meusPedidos = () => api.get('/pedidos')
export const todosPedidos = () => api.get('/pedidos/todos')
export const getPedido = (id) => api.get(`/pedidos/${id}`)
export const criarPedido = (data) => api.post('/pedidos', data)
export const modificarPedido = (id, data) => api.put(`/pedidos/${id}`, data)
export const cancelarPedido = (id) => api.patch(`/pedidos/${id}/cancelar`)
export const modificarPedidoAgente = (id, data) => api.put(`/pedidos/${id}/agente`, data)
export const avaliarPedido = (id, data) => api.patch(`/pedidos/${id}/avaliar`, data)
export const registrarContrato = (id, data) => api.post(`/pedidos/${id}/contrato`, data)
