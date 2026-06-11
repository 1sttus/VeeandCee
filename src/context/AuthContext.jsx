import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const LOCAL_KEY = 'veeandcee_auth'

// simple mock API using localStorage
const mockApi = {
  register: async ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem('vee_users') || '[]')
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists')
    }
    const user = { id: Date.now(), name, email }
    users.push({ ...user, password })
    localStorage.setItem('vee_users', JSON.stringify(users))
    return user
  },
  login: async ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('vee_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid credentials')
    const { password: _p, ...user } = found
    return user
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(user))
  }, [user])

  const register = async ({ name, email, password }) => {
    setLoading(true)
    setError(null)
    try {
      const newUser = await mockApi.register({ name, email, password })
      setUser(newUser)
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async ({ email, password }) => {
    setLoading(true)
    setError(null)
    try {
      const logged = await mockApi.login({ email, password })
      setUser(logged)
      return logged
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
