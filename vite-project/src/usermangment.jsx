import { useState } from 'react'

export default function UserManagement({ 
  registeredUsers = [], 
  onLogin, 
  onRegister 
}) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage({ text: '', type: '' })

    const cleanUser = username.trim()
    if (!cleanUser || !password) {
      setMessage({ text: 'Please enter both username and password.', type: 'error' })
      return
    }

    if (isRegistering) {
      // Registration Logic
      if (cleanUser.length < 3) {
        setMessage({ text: 'Username must be at least 3 characters long.', type: 'error' })
        return
      }

      if (password.length < 4) {
        setMessage({ text: 'Password must be at least 4 characters long.', type: 'error' })
        return
      }

      if (password !== confirmPassword) {
        setMessage({ text: 'Passwords do not match.', type: 'error' })
        return
      }

      const exists = registeredUsers.some(
        u => u.username.toLowerCase() === cleanUser.toLowerCase()
      )

      if (exists) {
        setMessage({ text: 'Username is already taken. Try another one.', type: 'error' })
        return
      }

      const newUser = {
        id: Date.now().toString(),
        username: cleanUser,
        password: password
      }

      onRegister(newUser)
      setMessage({ text: 'Registration successful! You can now log in.', type: 'success' })
      setIsRegistering(false)
      setPassword('')
      setConfirmPassword('')
    } else {
      // Login Logic
      const foundUser = registeredUsers.find(
        u => u.username.toLowerCase() === cleanUser.toLowerCase() && u.password === password
      )

      if (foundUser) {
        onLogin(foundUser)
      } else {
        setMessage({ text: 'Invalid username or password.', type: 'error' })
      }
    }
  }

  const toggleMode = () => {
    setIsRegistering(!isRegistering)
    setMessage({ text: '', type: '' })
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="auth-card">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <p className="auth-subtitle">
        {isRegistering 
          ? 'Create an account to get started' 
          : 'Please enter your credentials to continue'}
      </p>

      {message.text && (
        <div className={`message-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {isRegistering && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isRegistering ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="auth-switch">
        <span>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
        </span>
        <button type="button" onClick={toggleMode} className="switch-btn">
          {isRegistering ? 'Login here' : 'Register here'}
        </button>
      </div>
    </div>
  )
}