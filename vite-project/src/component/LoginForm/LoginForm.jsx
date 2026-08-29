import { useState } from 'react'
import './LoginForm.css'
import { FaUser, FaLock } from 'react-icons/fa'

const LoginForm = ({ registeredUsers = [], onLogin, onRegister }) => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setMessage({ text: '', type: '' })

    const cleanUser = username.trim()
    if (!cleanUser || !password) {
      setMessage({ text: 'Please enter all required fields.', type: 'error' })
      return
    }

    if (isRegistering) {
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
        (u) => u.username.toLowerCase() === cleanUser.toLowerCase()
      )

      if (exists) {
        setMessage({ text: 'Username is already taken. Try another one.', type: 'error' })
        return
      }

      const newUser = {
        id: Date.now().toString(),
        username: cleanUser,
        password: password,
      }

      if (onRegister) {
        onRegister(newUser)
      }
      setMessage({ text: 'Registration successful! You can now log in.', type: 'success' })
      setIsRegistering(false)
      setPassword('')
      setConfirmPassword('')
    } else {
      const foundUser = registeredUsers.find(
        (u) => u.username.toLowerCase() === cleanUser.toLowerCase() && u.password === password
      )

      if (foundUser) {
        if (onLogin) {
          onLogin(foundUser, rememberMe)
        }
      } else {
        setMessage({ text: 'Invalid username or password.', type: 'error' })
      }
    }
  }

  const toggleMode = (e) => {
    e.preventDefault()
    setIsRegistering(!isRegistering)
    setMessage({ text: '', type: '' })
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>{isRegistering ? 'Register' : 'Login'}</h1>

        {message.text && (
          <div className={`auth-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isRegistering ? 'new-password' : 'current-password'}
          />
          <FaLock className="icon" />
        </div>

        {isRegistering && (
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <FaLock className="icon" />
          </div>
        )}

        {!isRegistering && (
          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setMessage({ text: 'Password reset link sent (demo).', type: 'success' })
              }}
            >
              Forgot Password?
            </a>
          </div>
        )}

        <button type="submit" onClick={handleSubmit}>
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <div className="register-link">
          <p>
            {isRegistering ? (
              <>
                Already have an account?{' '}
                <a href="#" onClick={toggleMode}>
                  Login
                </a>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <a href="#" onClick={toggleMode}>
                  Register
                </a>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm