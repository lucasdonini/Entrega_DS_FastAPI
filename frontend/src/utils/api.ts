import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL ?? ''
const api = axios.create({
  baseURL: baseUrl,
  timeout: 40_000,
  headers: { 'Content-Type': 'application/json' }
})

export default api