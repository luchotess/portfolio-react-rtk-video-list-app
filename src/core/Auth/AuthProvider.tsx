import React, { createContext, ReactNode, useState } from 'react'
import { useDispatch } from 'react-redux'

import { reset } from '../../resources/videoList/videosListSlice.ts'

interface Props {
  children: ReactNode
}

const defaultUser = {
  email: null,
}

interface User {
  email: string | null
}

const useAuthContextValue = () => {
  const [user, setUser] = useState<User | null>(defaultUser)
  const dispatch = useDispatch()

  const login = (userData: User) => {
    // todo: Add real auth validation and authentication
    setUser(userData)
  }

  const logout = () => {
    dispatch(reset())
    setUser(null)
  }

  return {
    user,
    login,
    logout,
  }
}

export const AuthContext = createContext({} as ReturnType<typeof useAuthContextValue>)

export const AuthProvider: React.FC<Props> = ({ children }) => {
  return <AuthContext.Provider value={useAuthContextValue()}>{children}</AuthContext.Provider>
}
