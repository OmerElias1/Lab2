import { useState, useEffect } from 'react'
import LoginForm from './component/LoginForm/LoginForm'
import HomePage from './component/homepage'
import './App.css'

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const local = localStorage.getItem('lab_currentUser')
    if (local) return JSON.parse(local)
    const session = sessionStorage.getItem('lab_currentUser')
    if (session) return JSON.parse(session)
    return null
  })

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('lab_registeredUsers')
    if (saved) return JSON.parse(saved)
    return [
      { id: '1001', username: 'admin', password: 'password123' },
      { id: '1002', username: 'omer', password: 'password123' }
    ]
  })

  useEffect(() => {
    localStorage.setItem('lab_registeredUsers', JSON.stringify(registeredUsers))
  }, [registeredUsers])

  const handleLogin = (user, rememberMe = false) => {
    setCurrentUser(user)
    if (rememberMe) {
      localStorage.setItem('lab_currentUser', JSON.stringify(user))
    } else {
      sessionStorage.setItem('lab_currentUser', JSON.stringify(user))
    }
  }

  const handleRegister = (newUser) => {
    setRegisteredUsers((prev) => [...prev, newUser])
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('lab_currentUser')
    sessionStorage.removeItem('lab_currentUser')
  }

  return (
    <>
      {currentUser ? (
        <HomePage user={currentUser} onLogout={handleLogout} />
      ) : (
        <div className="auth-wrapper-container">
          <LoginForm
            registeredUsers={registeredUsers}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        </div>
      )}
    </>
  )
}