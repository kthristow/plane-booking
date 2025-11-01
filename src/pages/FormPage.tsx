import { useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";
import type { Airport } from "../types/Airport";
import { getAirports } from "../api/airportsApi";

export default function FormPage() {
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getAirports();
      setAirports(data || []);
    }
    load();
  }, []);

  return <BookingForm onCreated={() => {}} airports={airports} />;
}
