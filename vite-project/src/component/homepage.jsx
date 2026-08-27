export default function HomePage({ user, onLogout }) {
  const username = user?.username || 'User'

  return (
    <div className="home-card">
      <div className="home-header">
        <h2>Dashboard</h2>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="welcome-box">
        <h3>Welcome, <span>{username}</span>!</h3>
        <p>You have successfully logged in.</p>
      </div>

      <div className="user-info-box">
        <h4>User Details</h4>
        <div className="info-row">
          <span>Username:</span>
          <strong>{username}</strong>
        </div>
        <div className="info-row">
          <span>Status:</span>
          <span className="badge-active">Online</span>
        </div>
      </div>
    </div>
  )
}