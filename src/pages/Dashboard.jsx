import { useEffect, useState } from "react";
import { getEarthquakes } from "../services/earthquakeService";

function Dashboard() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEarthquakes() {
      try {
        const data = await getEarthquakes();
        setEarthquakes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadEarthquakes();
  }, []);

  const strongest =
    earthquakes.length > 0
      ? Math.max(
          ...earthquakes.map((earthquake) =>
            Number(earthquake.magnitude)
          )
        )
      : 0;

  function formatDate(date) {
    if (!date) {
      return "Unknown";
    }

    return new Date(date).toLocaleString("en-ZA", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

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
          <p className="card-label">SEISMIC ACTIVITY</p>

          <h2>{loading ? "—" : earthquakes.length}</h2>

          <p>Recent earthquake events recorded by Pulse.</p>
        </div>

        <div className="dashboard-card">
          <p className="card-label">STRONGEST EVENT</p>

          <h2>{loading ? "—" : strongest.toFixed(1)}</h2>

          <p>Highest earthquake magnitude in the current dataset.</p>
        </div>

        <div className="dashboard-card">
          <p className="card-label">DATA SOURCE</p>

          <h2>USGS</h2>

          <p>
            United States Geological Survey earthquake data.
          </p>
        </div>
      </section>

      <section className="earthquake-section">
        <div className="section-heading">
          <div>
            <p className="dashboard-label">LIVE EVENT FEED</p>
            <h2>Recent Earthquakes</h2>
          </div>

          <span className="event-count">
            {earthquakes.length} events
          </span>
        </div>

        {loading && (
          <p className="dashboard-message">
            Loading seismic activity...
          </p>
        )}

        {error && (
          <p className="dashboard-error">
            Unable to load earthquake data: {error}
          </p>
        )}

        {!loading && !error && earthquakes.length === 0 && (
          <p className="dashboard-message">
            No earthquake events are currently available.
          </p>
        )}

        {!loading && !error && earthquakes.length > 0 && (
          <div className="earthquake-list">
            {earthquakes.map((earthquake) => (
              <article
                className="earthquake-card"
                key={earthquake.id}
              >
                <div className="earthquake-main">
                  <div className="magnitude">
                    M {Number(earthquake.magnitude).toFixed(1)}
                  </div>

                  <div>
                    <p className="event-location">
                      {earthquake.location || "Unknown location"}
                    </p>

                    <p className="event-time">
                      {formatDate(earthquake.occurred_at)}
                    </p>
                  </div>
                </div>

                <div className="event-coordinates">
                  <span>
                    {earthquake.latitude ?? "—"}° N
                  </span>

                  <span>
                    {earthquake.longitude ?? "—"}° E
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;