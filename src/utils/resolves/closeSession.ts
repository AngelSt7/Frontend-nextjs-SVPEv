'use client'

import axios from 'axios'
export const closeSession = async () => {
    const ruta = 'http://localhost:3000'
    localStorage.removeItem('AUTH_TOKEN')
    await axios.delete(`${ruta}/api/cookie/delete`)
}