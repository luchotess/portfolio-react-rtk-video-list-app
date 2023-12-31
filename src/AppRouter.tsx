import { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AuthContext } from './core/Auth/AuthProvider.tsx'
import Home from './pages/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'

const AppRouter: React.FC = () => {
  const authContext = useContext(AuthContext)
  const { user } = authContext

  // todo: Add real user auth validation
  const isUserAuthenticated = () => user?.email

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={isUserAuthenticated() ? <Home /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
