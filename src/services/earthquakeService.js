import { supabase } from "../supabase";

export async function getEarthquakes() {

  const { data, error } = await supabase
    .from("earthquakes")
    .select("*")
    .order("occurred_at", { ascending: false })
    .limit(100);

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}