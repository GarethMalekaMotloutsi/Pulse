import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getEarthquakes() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("earthquakes")
        .select("*")
        .order("occurred_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Supabase error:", error);
        setError(error.message);
      } else {
        console.log("Supabase data:", data);
        setEarthquakes(data || []);
      }

      setLoading(false);
    }

    getEarthquakes();
  }, []);

  const strongestEarthquake =
    earthquakes.length > 0
      ? Math.max(...earthquakes.map((earthquake) => earthquake.magnitude || 0))
      : 0;

  return (
    <main className="app">
      {/* Header */}
      <header className="header">
        <div>
          <p className="eyebrow">REAL-TIME EARTHQUAKE MONITOR</p>
          <h1>Pulse</h1>
          <p className="subtitle">
            Monitor seismic activity and earthquake events.
          </p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          <span>Live connection</span>
        </div>
      </header>

      {/* Dashboard statistics */}
      <section className="stats">
        <div className="stat-card">
          <span className="stat-label">EVENTS</span>
          <strong>{earthquakes.length}</strong>
          <span className="stat-description">
            Earthquake events loaded
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">STRONGEST</span>
          <strong>
            {strongestEarthquake > 0
              ? strongestEarthquake.toFixed(1)
              : "—"}
          </strong>
          <span className="stat-description">
            Highest recorded magnitude
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">SOURCE</span>
          <strong>Supabase</strong>
          <span className="stat-description">
            PostgreSQL data platform
          </span>
        </div>
      </section>

      {/* Earthquake section */}
      <section className="earthquake-section">
        <div className="section-heading">
          <div>
            <p className="section-label">SEISMIC ACTIVITY</p>
            <h2>Latest earthquakes</h2>
          </div>

          <span className="event-count">
            {earthquakes.length} event
            {earthquakes.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="message-card">
            <div className="spinner"></div>
            <p>Loading earthquake data...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="message-card error-card">
            <p className="message-title">Unable to load data</p>
            <p>{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && earthquakes.length === 0 && (
          <div className="message-card">
            <p className="message-title">No earthquake data</p>
            <p>
              There are currently no earthquake events stored in Pulse.
            </p>
          </div>
        )}

        {/* Earthquake cards */}
        {!loading && !error && earthquakes.length > 0 && (
          <div className="earthquake-grid">
            {earthquakes.map((earthquake) => {
              const magnitude = Number(earthquake.magnitude || 0);

              let severity = "low";

              if (magnitude >= 6) {
                severity = "high";
              } else if (magnitude >= 4) {
                severity = "medium";
              }

              return (
                <article className="earthquake-card" key={earthquake.id}>
                  <div className="card-top">
                    <span className={`magnitude ${severity}`}>
                      M {magnitude.toFixed(1)}
                    </span>

                    <span className="event-id">
                      {earthquake.id}
                    </span>
                  </div>

                  <div className="location">
                    <span className="location-icon">⌖</span>

                    <div>
                      <span className="field-label">LOCATION</span>
                      <h3>{earthquake.location}</h3>
                    </div>
                  </div>

                  <div className="coordinates">
                    <div>
                      <span className="field-label">LATITUDE</span>
                      <strong>
                        {earthquake.latitude ?? "—"}
                      </strong>
                    </div>

                    <div>
                      <span className="field-label">LONGITUDE</span>
                      <strong>
                        {earthquake.longitude ?? "—"}
                      </strong>
                    </div>
                  </div>

                  <div className="card-footer">
                    <span>
                      {earthquake.occurred_at
                        ? new Date(
                            earthquake.occurred_at
                          ).toLocaleString()
                        : "Time not recorded"}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;