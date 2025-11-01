import { useEffect, useState } from "react";
import BookingList from "../components/BookingList";
import type { Airport } from "../types/Airport";
import { getAirports } from "../api/airportsApi";

export default function ListPage() {
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getAirports();
      setAirports(data || []);
    }
    load();
  }, []);

  return <BookingList airports={airports} />;
}
