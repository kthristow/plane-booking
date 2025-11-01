import type { Booking, BookingFormData } from "../types/Booking";
import { BASE_URL } from "../common/constants";
import { withToken } from "../common/helper";

export async function getBookings(pageIndex: number, pageSize = 5): Promise<Booking[]> {
  const res = await fetch(
    withToken(`${BASE_URL}/bookings?pageIndex=${pageIndex}&pageSize=${pageSize}`)
  );
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to load bookings: ${msg}`);
  }

  const data = await res.json();
  return data.list || data; 
}

export async function createBooking(data: BookingFormData): Promise<Booking> {
  const res = await fetch(withToken(`${BASE_URL}/bookings/create`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to create booking: ${msg}`);
  }
  return res.json();
}

export async function deleteBooking(bookingId: number): Promise<void> {
  const res = await fetch(withToken(`${BASE_URL}/bookings/delete/${bookingId}`), {
    method: "DELETE",
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to delete booking: ${msg}`);
  }
}

export async function getBookingDetails(bookingId: number): Promise<Booking> {
  const res = await fetch(withToken(`${BASE_URL}/bookings/${bookingId}`));
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to fetch booking details: ${msg}`);
  }
  return res.json();
}