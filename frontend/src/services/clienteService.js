import api from './api'

export const login = (data) => api.post('/auth/login', data)
export const registerCliente = (data) => api.post('/auth/register', data)

export const getMe = () => api.get('/clientes/me')
export const updateMe = (data) => api.put('/clientes/me', data)
export const deleteMe = () => api.delete('/clientes/me')
