import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getEarthquakes() {
      const { data, error } = await supabase
        .from("earthquakes")
        .select("*")
        .limit(10);

      if (error) {
        setError(error.message);
      } else {
        setEarthquakes(data);
      }

      setLoading(false);
    }

    getEarthquakes();
  }, []);

  return (
    <div>
      <h1>Pulse</h1>

      <h2>Earthquakes</h2>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && earthquakes.length === 0 && (
        <p>No earthquake data yet.</p>
      )}

      {earthquakes.map((earthquake) => (
        <div key={earthquake.id}>
          <p>Location: {earthquake.location}</p>
          <p>Magnitude: {earthquake.magnitude}</p>
        </div>
      ))}
    </div>
  );
}

export default App;