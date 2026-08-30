import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-26.2041&longitude=28.0473&current=temperature_2m,wind_speed_10m,weather_code";

async function fetchWeather() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status}`);
    }

    const result = await response.json();

    const weather = {
      id: "johannesburg",
      location: "Johannesburg, South Africa",
      latitude: -26.2041,
      longitude: 28.0473,
      temperature: result.current.temperature_2m,
      wind_speed: result.current.wind_speed_10m,
      weather_code: result.current.weather_code,
      fetched_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("weather")
      .upsert(weather, { onConflict: "id" });

    if (error) {
      throw error;
    }

    console.log("Weather data saved.");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchWeather();