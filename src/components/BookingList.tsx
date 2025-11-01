import { useState, useEffect } from "react";
import { getBookings, deleteBooking } from "../api/bookingsApi";
import type { Booking } from "../types/Booking";
import type { Airport } from "../types/Airport";
import BookingModal from "./BookingModal";
import { logError } from "../common/errorLogger";

interface Props {
  airports: Airport[];
}

export default function BookingList({ airports }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const data = await getBookings(pageIndex);
      if (Array.isArray(data) && data.length > 0) {
        setBookings((prev) => [...prev, ...data]);
        setPageIndex((p) => p + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      logError("BookingList - loadMore", err);
      setErrorMessage(" Failed to fetch bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id: number) {
    setErrorMessage(null);
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      logError("BookingList → handleDelete", err);
      setErrorMessage(`Failed to delete booking #${id}. Try again.`);
    }
  }

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) loadMore();
  }

  return (
    <>
      <div className="table-container" onScroll={handleScroll}>
        <h2 className="table-header">All Bookings</h2>

        {errorMessage && (
          <div className="error-banner" style={{ marginBottom: "1rem" }}>
            {errorMessage}
          </div>
        )}

        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Dates</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => {
              const from = airports.find((a) => a.id === b.departureAirportId);
              const to = airports.find((a) => a.id === b.arrivalAirportId);

              return (
                <tr
                  key={b.id}
                  onClick={() => setSelectedBooking(b)}
                  className="booking-row"
                >
                  <td>{b.id}</td>
                  <td>
                    {b.firstName} {b.lastName}
                  </td>
                  <td>
                    {from
                      ? `${from.title} (${from.code})`
                      : `#${b.departureAirportId}`}
                  </td>
                  <td>
                    {to ? `${to.title} (${to.code})` : `#${b.arrivalAirportId}`}
                  </td>
                  <td>
                    {b.departureDate.slice(0, 10)} → {b.returnDate.slice(0, 10)}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(b.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {loading && <p className="end-text">Loading more...</p>}
        {!hasMore && !loading && (
          <p className="end-text">No more bookings to load.</p>
        )}
      </div>

      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          airports={airports}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </>
  );
}
