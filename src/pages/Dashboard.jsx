import { useEffect, useState } from "react";
import { getEarthquakes } from "../services/earthquakeService";
import { getWeather } from "../services/weatherService";

function Dashboard() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [minMagnitude, setMinMagnitude] = useState("");

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState("");

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

  useEffect(() => {
    async function loadWeather() {
      try {
        const data = await getWeather();
        setWeather(data);
      } catch (err) {
        setWeatherError(err.message);
      } finally {
        setWeatherLoading(false);
      }
    }

    loadWeather();
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

  function getWeatherDescription(code) {
    if (code === 0) {
      return "Clear sky";
    }

    if (code >= 1 && code <= 3) {
      return "Partly cloudy";
    }

    if (code >= 45 && code <= 48) {
      return "Fog";
    }

    if (code >= 51 && code <= 57) {
      return "Drizzle";
    }

    if (code >= 61 && code <= 67) {
      return "Rain";
    }

    if (code >= 71 && code <= 77) {
      return "Snow";
    }

    if (code >= 80 && code <= 82) {
      return "Rain showers";
    }

    if (code >= 85 && code <= 86) {
      return "Snow showers";
    }

    if (code >= 95 && code <= 99) {
      return "Thunderstorm";
    }

    return "Unknown";
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

          <h2>{loading ? "—" : filteredEarthquakes.length}</h2>

          <p>Earthquake events matching the current filter.</p>
        </div>

        <div className="dashboard-card">
          <p className="card-label">STRONGEST EVENT</p>

          <h2>
            {loading ? "—" : strongest > 0 ? strongest.toFixed(1) : "—"}
          </h2>

          <p>Highest earthquake magnitude in the filtered dataset.</p>
        </div>

        <div className="dashboard-card">
          <p className="card-label">DATA SOURCE</p>

          <h2>USGS</h2>

          <p>United States Geological Survey earthquake data.</p>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-card">
          <p className="card-label">WEATHER</p>

          <h2>
            {weatherLoading
              ? "—"
              : weather
                ? `${weather.temperature}°C`
                : "—"}
          </h2>

          <p>
            {weatherLoading
              ? "Loading weather data..."
              : weather
                ? weather.location
                : weatherError
                  ? "Weather data unavailable."
                  : "No weather data available."}
          </p>
        </div>

        <div className="dashboard-card">
          <p className="card-label">WIND SPEED</p>

          <h2>
            {weatherLoading
              ? "—"
              : weather
                ? `${weather.wind_speed} km/h`
                : "—"}
          </h2>

          <p>Current recorded wind speed.</p>
        </div>

        <div className="dashboard-card">
          <p className="card-label">WEATHER STATUS</p>

          <h2>
            {weatherLoading
              ? "—"
              : weather
                ? getWeatherDescription(Number(weather.weather_code))
                : "—"}
          </h2>

          <p>Current weather condition in Johannesburg.</p>
        </div>
      </section>

      <section className="earthquake-section">
        <div className="section-heading">
          <div>
            <p className="dashboard-label">LIVE EVENT FEED</p>
            <h2>Recent Earthquakes</h2>
          </div>

          <div className="filter-control">
            <label htmlFor="magnitude-filter">
              Minimum magnitude
            </label>

            <select
              id="magnitude-filter"
              value={minMagnitude}
              onChange={(event) => setMinMagnitude(event.target.value)}
            >
              <option value="">All</option>
              <option value="1">1.0+</option>
              <option value="2">2.0+</option>
              <option value="3">3.0+</option>
              <option value="4">4.0+</option>
              <option value="5">5.0+</option>
            </select>
          </div>
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

        {!loading && !error && filteredEarthquakes.length === 0 && (
          <p className="dashboard-message">
            No earthquake events match this filter.
          </p>
        )}

        {!loading && !error && filteredEarthquakes.length > 0 && (
          <div className="earthquake-list">
            {filteredEarthquakes.map((earthquake) => (
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