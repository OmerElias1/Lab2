import { useState } from 'react'
import './App.css'

// 1. Simple HomePage Component
function HomePage({ username, onLogout }) {
  return (
    <div className="homepage">
      <h1>Dashboard</h1>
      <p>Welcome, <strong>{username}</strong>! You are now logged in.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

// 2. Main App Component
export default function App() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
    setPassword("")
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (username.trim()) {
      setIsLoggedIn(true)
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <HomePage username={username} onLogout={handleLogout} />
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <input 
              type="text" 
              placeholder="username" 
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      )}
    </div>
  )
}