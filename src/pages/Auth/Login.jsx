import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await login({ email, password })
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-12">
      <h2 className="text-2xl font-serif text-brown mb-4">Sign In</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-charcoal">Email</span>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full p-3 border rounded" />
        </label>
        <label className="block">
          <span className="text-sm text-charcoal">Password</span>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full p-3 border rounded" />
        </label>
        <button type="submit" className="w-full bg-brown text-white py-3 rounded">Sign In</button>
      </form>
      <p className="mt-4 text-sm text-charcoal/70">Don't have an account? <Link to="/signup" className="text-brown font-medium">Create one</Link></p>
    </div>
  )
}
