export const setJWT = ( token: string ) => {
    localStorage.setItem('AUTH_TOKEN', token)
}