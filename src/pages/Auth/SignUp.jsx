import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (password !== confirm) return setError('Passwords do not match')
    try {
      await register({ name, email, password })
      navigate('/account')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-12">
      <h2 className="text-2xl font-serif text-brown mb-4">Create Account</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-charcoal">Full name</span>
          <input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full p-3 border rounded" />
        </label>
        <label className="block">
          <span className="text-sm text-charcoal">Email</span>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full p-3 border rounded" />
        </label>
        <label className="block">
          <span className="text-sm text-charcoal">Password</span>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full p-3 border rounded" />
        </label>
        <label className="block">
          <span className="text-sm text-charcoal">Confirm Password</span>
          <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} className="mt-1 block w-full p-3 border rounded" />
        </label>
        <button type="submit" className="w-full bg-brown text-white py-3 rounded">Create Account</button>
      </form>
      <p className="mt-4 text-sm text-charcoal/70">Already have an account? <Link to="/login" className="text-brown font-medium">Sign in</Link></p>
    </div>
  )
}
