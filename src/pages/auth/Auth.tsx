import { Navigate, Outlet } from "react-router-dom"
//Git hub TEST

const Auth = () => {
    const token = localStorage.getItem('access_token')
  return token ? <Outlet/> : <Navigate to="/login" />
    
    
    
  
}

export default Auth