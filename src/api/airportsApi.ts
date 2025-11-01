import { BASE_URL } from "../common/constants";
import { withToken } from "../common/helper";
import type { Airport } from "../types/Airport";

export async function getAirports(): Promise<Airport[]> {
  const res = await fetch(withToken(`${BASE_URL}/airports`));
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to load airports: ${msg}`);
  }
  return res.json();
}