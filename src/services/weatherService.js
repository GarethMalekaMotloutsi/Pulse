import { supabase } from "../supabase";

export async function getWeather() {
  const { data, error } = await supabase
    .from("weather")
    .select("*")
    .eq("id", "johannesburg")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}