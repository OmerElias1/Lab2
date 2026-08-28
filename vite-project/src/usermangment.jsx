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
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
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
      <div className="auth-icon-wrapper">
        <svg className="auth-svg-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isRegistering ? (
            <>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </>
          ) : (
            <>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </>
          )}
        </svg>
      </div>

      <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
      <p className="auth-subtitle">
        {isRegistering 
          ? 'Sign up to create your account' 
          : 'Please enter your details to sign in'}
      </p>

      {message.text && (
        <div className={`message-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <div className="label-row">
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isRegistering ? 'new-password' : 'current-password'}
          />
        </div>

        {isRegistering && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
        )}

        {!isRegistering && (
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isRegistering ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="auth-switch">
        <span>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
        </span>
        <button type="button" onClick={toggleMode} className="switch-btn">
          {isRegistering ? 'Sign in' : 'Sign up'}
        </button>
      </div>
    </div>
  )
}