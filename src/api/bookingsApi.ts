import type { Booking, BookingFormData } from "../types/Booking";
import { BASE_URL } from "../common/constants";
import { withToken } from "../common/helper";
import { getFriendlyMessage, logError } from "../common/errorLogger";

export async function getBookings(
  pageIndex: number,
  pageSize = 5
): Promise<Booking[]> {
  try {
    const res = await fetch(
      withToken(`${BASE_URL}/bookings?pageIndex=${pageIndex}&pageSize=${pageSize}`)
    );
    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    return data.list || data;
  } catch (err) {
    logError("getBookings", err);
    throw new Error(getFriendlyMessage("Failed to load bookings."));
  }
}

export async function createBooking(data: BookingFormData): Promise<Booking> {
  try {
    const res = await fetch(withToken(`${BASE_URL}/bookings/create`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    logError("createBooking", err);
    throw new Error(getFriendlyMessage("Failed to create booking."));
  }
}

export async function deleteBooking(bookingId: number): Promise<void> {
  try {
    const res = await fetch(
      withToken(`${BASE_URL}/bookings/delete/${bookingId}`),
      { method: "DELETE" }
    );
    if (!res.ok) throw new Error(await res.text());
  } catch (err) {
    logError("deleteBooking", err);
    throw new Error(getFriendlyMessage("Failed to delete booking."));
  }
}

export async function getBookingDetails(bookingId: number): Promise<Booking> {
  try {
    const res = await fetch(withToken(`${BASE_URL}/bookings/${bookingId}`));
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    logError("getBookingDetails", err);
    throw new Error(getFriendlyMessage("Failed to fetch booking details."));
  }
}