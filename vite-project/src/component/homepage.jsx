import { useState } from 'react'

export default function HomePage({ user, onLogout }) {
  const username = user?.username || 'User'
  const userId = user?.id ? `USR-${user.id.toString().slice(-6)}` : 'USR-948102'
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loginTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  const [loginDate] = useState(() => new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }))

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' }
  ]

  return (
    <div className="app-fullscreen">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="nav-brand">
            <div className="brand-logo">LP</div>
            <span className="brand-name">LabPortal</span>
            <span className="version-badge">v2.0</span>
          </div>

          <nav className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="user-profile-pill">
              <div className="nav-avatar">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="user-text-meta">
                <span className="nav-username">{username}</span>
                <span className="nav-user-status">Online</span>
              </div>
            </div>
            <button onClick={onLogout} className="navbar-logout-btn" title="Sign out">
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Screen Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="content-container">
            {/* Hero Welcome Banner */}
            <div className="welcome-banner">
              <div className="welcome-text">
                <h1>Welcome back, {username}</h1>
                <p>Here is what is happening with your workspace today.</p>
              </div>
              <div className="session-pill">
                <span>Logged in: {loginDate} at {loginTime}</span>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="dashboard-stats-grid">
              <div className="stat-box">
                <div className="stat-box-header">
                  <span className="stat-box-title">Active Projects</span>
                </div>
                <div className="stat-box-num">12</div>
                <div className="stat-box-footer text-green">+2 new this week</div>
              </div>

              <div className="stat-box">
                <div className="stat-box-header">
                  <span className="stat-box-title">System Status</span>
                </div>
                <div className="stat-box-num">Optimal</div>
                <div className="stat-box-footer text-blue">99.9% Uptime</div>
              </div>

              <div className="stat-box">
                <div className="stat-box-header">
                  <span className="stat-box-title">Security Status</span>
                </div>
                <div className="stat-box-num">Protected</div>
                <div className="stat-box-footer text-green">2FA Enabled</div>
              </div>

              <div className="stat-box">
                <div className="stat-box-header">
                  <span className="stat-box-title">Tasks Completed</span>
                </div>
                <div className="stat-box-num">28 / 32</div>
                <div className="stat-box-footer text-purple">87.5% completion</div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="dashboard-grid-layout">
              {/* Left Column: Account Details & Quick Actions */}
              <div className="grid-column">
                <div className="card-panel">
                  <div className="card-panel-header">
                    <h3>Account Overview</h3>
                    <span className="badge-pill">Verified</span>
                  </div>
                  <div className="overview-details">
                    <div className="overview-row">
                      <span className="overview-label">Account ID</span>
                      <strong className="mono-badge">{userId}</strong>
                    </div>
                    <div className="overview-row">
                      <span className="overview-label">Username</span>
                      <strong>{username}</strong>
                    </div>
                    <div className="overview-row">
                      <span className="overview-label">Access Level</span>
                      <span>Standard User</span>
                    </div>
                    <div className="overview-row">
                      <span className="overview-label">Current Session</span>
                      <span className="badge-active">Active</span>
                    </div>
                  </div>
                </div>

                <div className="card-panel">
                  <div className="card-panel-header">
                    <h3>Quick Actions</h3>
                  </div>
                  <div className="quick-actions-grid">
                    <button className="quick-btn" onClick={() => setActiveTab('projects')}>
                      Browse Projects
                    </button>
                    <button className="quick-btn" onClick={() => setActiveTab('analytics')}>
                      View Analytics
                    </button>
                    <button className="quick-btn" onClick={() => setActiveTab('settings')}>
                      Manage Settings
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Recent Activity Feed */}
              <div className="grid-column">
                <div className="card-panel">
                  <div className="card-panel-header">
                    <h3>Recent Activity</h3>
                    <span className="text-muted-link">View All</span>
                  </div>
                  <div className="timeline-list">
                    <div className="timeline-item">
                      <div className="timeline-dot dot-green"></div>
                      <div className="timeline-content">
                        <p className="timeline-title">Successfully authenticated session</p>
                        <span className="timeline-time">Today at {loginTime}</span>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-dot dot-blue"></div>
                      <div className="timeline-content">
                        <p className="timeline-title">System health check completed</p>
                        <span className="timeline-time">Today at {loginTime}</span>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-dot dot-purple"></div>
                      <div className="timeline-content">
                        <p className="timeline-title">Project configuration synchronized</p>
                        <span className="timeline-time">Yesterday</span>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-dot dot-gray"></div>
                      <div className="timeline-content">
                        <p className="timeline-title">Security token refreshed</p>
                        <span className="timeline-time">3 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="content-container">
            <div className="section-header">
              <div>
                <h2>Projects</h2>
                <p className="section-subtitle">Manage and track your active lab projects</p>
              </div>
              <button className="primary-action-btn">+ New Project</button>
            </div>

            <div className="projects-grid">
              <div className="project-card">
                <div className="project-card-top">
                  <span className="project-tag tag-blue">Frontend</span>
                  <span className="project-status">In Progress</span>
                </div>
                <h3>React + Vite App</h3>
                <p>User management and dashboard frontend built with React.</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '85%' }}></div>
                </div>
                <div className="project-card-footer">
                  <span>85% complete</span>
                  <span>Updated today</span>
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-top">
                  <span className="project-tag tag-green">Backend</span>
                  <span className="project-status">Active</span>
                </div>
                <h3>Authentication API</h3>
                <p>RESTful service handles user signup, tokens, and authorization.</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '92%' }}></div>
                </div>
                <div className="project-card-footer">
                  <span>92% complete</span>
                  <span>Updated 2d ago</span>
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-top">
                  <span className="project-tag tag-purple">DevOps</span>
                  <span className="project-status">Pending</span>
                </div>
                <h3>CI/CD Automated Pipeline</h3>
                <p>Automated test validation and build deployment flow.</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '60%' }}></div>
                </div>
                <div className="project-card-footer">
                  <span>60% complete</span>
                  <span>Updated 5d ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="content-container">
            <div className="section-header">
              <div>
                <h2>Analytics & Performance</h2>
                <p className="section-subtitle">Real-time statistics and user activity logs</p>
              </div>
            </div>

            <div className="analytics-card">
              <h3>System Performance</h3>
              <p className="text-muted">Average response time: <strong>42ms</strong> • Peak CPU: <strong>14%</strong></p>
              <div className="stats-metric-row">
                <div className="metric-item">
                  <span className="metric-val">99.98%</span>
                  <span className="metric-label">Uptime</span>
                </div>
                <div className="metric-item">
                  <span className="metric-val">1.2k</span>
                  <span className="metric-label">Requests / hour</span>
                </div>
                <div className="metric-item">
                  <span className="metric-val">0</span>
                  <span className="metric-label">Critical Errors</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="content-container">
            <div className="section-header">
              <div>
                <h2>Settings</h2>
                <p className="section-subtitle">Account preferences and security options</p>
              </div>
            </div>

            <div className="settings-panel">
              <div className="settings-section">
                <h3>Profile Settings</h3>
                <div className="settings-row">
                  <div>
                    <strong>Username</strong>
                    <p className="settings-desc">Your display name across the platform</p>
                  </div>
                  <input type="text" className="settings-input" defaultValue={username} readOnly />
                </div>
                <div className="settings-row">
                  <div>
                    <strong>User Identifier</strong>
                    <p className="settings-desc">Unique identifier generated upon registration</p>
                  </div>
                  <span className="mono-badge">{userId}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}