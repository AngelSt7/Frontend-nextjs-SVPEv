import axios from 'axios'

export const setJWT = async ( token: string ) => {
    const ruta = 'http://localhost:3000'
    localStorage.setItem('AUTH_TOKEN', token)
    await axios.post(`${ruta}/api/cookie/set`, { token })
}