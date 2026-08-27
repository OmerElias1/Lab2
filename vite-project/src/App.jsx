import { useState, useEffect } from 'react'
import HomePage from './component/homepage'
import UserManagement from './usermangment'
import './App.css'

export default function App() {
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('app_users')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
    return DEFAULT_USERS
  })

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('app_current_user')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
    return null
  })

  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(registeredUsers))
  }, [registeredUsers])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('app_current_user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('app_current_user')
    }
  }, [currentUser])

  const handleRegister = (newUser) => {
    setRegisteredUsers((prev) => [...prev, newUser])
  }

  const handleLogin = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  return (
    <div className="container">
      {currentUser ? (
        <HomePage user={currentUser} onLogout={handleLogout} />
      ) : (
        <UserManagement
          registeredUsers={registeredUsers}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
    </div>
  )
}