import { BASE_URL } from "../common/constants";
import { getFriendlyMessage, logError } from "../common/errorLogger";
import { withToken } from "../common/helper";
import type { Airport } from "../types/Airport";

export async function getAirports(): Promise<Airport[]> {
  try {
    const res = await fetch(withToken(`${BASE_URL}/airports`));
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    logError("getAirports", err);
    throw new Error(getFriendlyMessage("Failed to load airports."));
  }
}