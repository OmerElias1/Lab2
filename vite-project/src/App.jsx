import { useState } from 'react'
import HomePage from './component/homepage'
import UserManagement from './usermangment'
import './App.css'

export default function App() {
  const [registeredUsers, setRegisteredUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const handleRegister = (newUser) => {
    setRegisteredUsers([...registeredUsers, newUser])
  }

  const handleLogin = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  return (
    <>
      {currentUser ? (
        <HomePage user={currentUser} onLogout={handleLogout} />
      ) : (
        <div className="auth-page-wrapper">
          <UserManagement
            registeredUsers={registeredUsers}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        </div>
      )}
    </>
  )
}