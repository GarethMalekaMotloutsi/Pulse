import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const API_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

async function fetchEarthquakes() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`USGS API error: ${response.status}`);
    }

    const result = await response.json();

    const earthquakes = result.features.map((item) => ({
      id: item.id,
      magnitude: item.properties.mag,
      location: item.properties.place,
      latitude: item.geometry.coordinates[1],
      longitude: item.geometry.coordinates[0],
      occurred_at: new Date(item.properties.time).toISOString(),
    }));

    const { error } = await supabase
      .from("earthquakes")
      .upsert(earthquakes, { onConflict: "id" });

    if (error) {
      throw error;
    }

    console.log(`Saved ${earthquakes.length} earthquakes.`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchEarthquakes();