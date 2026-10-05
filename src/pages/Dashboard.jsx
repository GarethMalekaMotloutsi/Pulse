function Dashboard() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-label">PULSE COMMAND</p>

          <h1>Global Intelligence Dashboard</h1>

          <p className="dashboard-description">
            Monitor global events, environmental conditions and emerging
            situations from a single dashboard.
          </p>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          <span>System Online</span>
        </div>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-card">
          <p className="card-label">EVENT MONITOR</p>

          <h2>Global Events</h2>

          <p>
            Real-time event data will appear here as Pulse Command develops.
          </p>
        </div>

        <div className="dashboard-card">
          <p className="card-label">ENVIRONMENT</p>

          <h2>Weather Conditions</h2>

          <p>
            Environmental data will be integrated into the command dashboard.
          </p>
        </div>

        <div className="dashboard-card">
          <p className="card-label">ANALYTICS</p>

          <h2>Situation Overview</h2>

          <p>
            Event statistics and intelligence summaries will appear here.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;