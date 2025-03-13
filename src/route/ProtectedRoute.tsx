import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const accessToken = sessionStorage.getItem('access_token')
  
  return accessToken ? <Outlet /> : <Navigate to="/login"  replace/>
}

export default ProtectedRoute