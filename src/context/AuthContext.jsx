'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const LOCAL_KEY = 'veeandcee_auth'
const TOKEN_KEY = 'veeandcee_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(LOCAL_KEY)
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (e) {
      console.error('Failed to load auth state from localStorage:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  const persistUser = (nextUser) => {
    setUser(nextUser)
    localStorage.setItem(LOCAL_KEY, JSON.stringify(nextUser))
  }

  const register = async ({ name, email, password, profileImage }) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, profileImage }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      persistUser(data.user)
      localStorage.setItem(TOKEN_KEY, data.token)
      return data.user
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      persistUser(data.user)
      localStorage.setItem(TOKEN_KEY, data.token)
      return data.user
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(LOCAL_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }

  const updateUser = (nextUser) => {
    persistUser(nextUser)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
