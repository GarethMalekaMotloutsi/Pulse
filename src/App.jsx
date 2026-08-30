import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [minMagnitude, setMinMagnitude] = useState("");

  useEffect(() => {
    async function getEarthquakes() {
      const { data, error } = await supabase
        .from("earthquakes")
        .select("*")
        .order("occurred_at", { ascending: false })
        .limit(100);

      if (error) {
        setError(error.message);
      } else {
        setEarthquakes(data || []);
      }

      setLoading(false);
    }

    getEarthquakes();
  }, []);

  const filteredEarthquakes = earthquakes.filter((earthquake) => {
    if (minMagnitude === "") {
      return true;
    }

    return Number(earthquake.magnitude) >= Number(minMagnitude);
  });

  const strongest =
    filteredEarthquakes.length > 0
      ? Math.max(
          ...filteredEarthquakes.map((earthquake) =>
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
    <main className="app">
      <header className="hero">
        <p className="brand">PULSE</p>

        <h1>Earthquake Monitor</h1>

        <p className="subtitle">
          Monitor recent seismic activity using live USGS earthquake data.
        </p>
      </header>

      <section className="stats">
        <div className="stat-card">
          <p className="stat-label">EVENTS</p>
          <h2>{filteredEarthquakes.length}</h2>
          <p>Earthquakes matching your filter</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">STRONGEST</p>
          <h2>{strongest > 0 ? strongest : "—"}</h2>
          <p>Highest recorded magnitude</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">SOURCE</p>
          <h2>USGS</h2>
          <p>United States Geological Survey</p>
        </div>
      </section>

      <section className="earthquake-section">
        <div className="section-header">
          <div>
            <p className="section-label">SEISMIC ACTIVITY</p>
            <h2>Latest earthquakes</h2>
          </div>

          <div className="filter">
            <label htmlFor="magnitude">Minimum magnitude</label>

            <select
              id="magnitude"
              value={minMagnitude}
              onChange={(event) => setMinMagnitude(event.target.value)}
            >
              <option value="">All earthquakes</option>
              <option value="1">1.0+</option>
              <option value="2">2.0+</option>
              <option value="3">3.0+</option>
              <option value="4">4.0+</option>
              <option value="5">5.0+</option>
            </select>
          </div>
        </div>

        {loading && <p className="message">Loading earthquake data...</p>}

        {error && <p className="error">Error: {error}</p>}

        {!loading && !error && filteredEarthquakes.length === 0 && (
          <p className="message">No earthquakes match this filter.</p>
        )}

        <div className="earthquake-list">
          {filteredEarthquakes.map((earthquake) => (
            <article className="earthquake-card" key={earthquake.id}>
              <div className="card-top">
                <span className="magnitude">
                  M {Number(earthquake.magnitude).toFixed(1)}
                </span>

                <span className="earthquake-id">{earthquake.id}</span>
              </div>

              <div className="location">
                <p className="card-label">LOCATION</p>
                <h3>{earthquake.location}</h3>
              </div>

              <div className="earthquake-details">
                <div>
                  <p className="card-label">LATITUDE</p>
                  <strong>{earthquake.latitude}</strong>
                </div>

                <div>
                  <p className="card-label">LONGITUDE</p>
                  <strong>{earthquake.longitude}</strong>
                </div>

                <div>
                  <p className="card-label">OCCURRED</p>
                  <strong>{formatDate(earthquake.occurred_at)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;