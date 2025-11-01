import "../styles/modal.css";
import type { Airport } from "../types/Airport";
import type { Booking } from "../types/Booking";

interface BookingModalProps {
  booking: Booking;
  airports: Airport[];
  onClose: () => void;
}

export default function BookingModal({
  booking,
  airports,
  onClose,
}: BookingModalProps) {
  const departureAirport = airports.find(
    (a) => a.id === booking.departureAirportId
  );
  const arrivalAirport = airports.find(
    (a) => a.id === booking.arrivalAirportId
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Booking #{booking.id}</h3>

        <p>
          <strong>Name:</strong> {booking.firstName} {booking.lastName}
        </p>

        <p>
          <strong>From:</strong>{" "}
          {departureAirport
            ? `${departureAirport.title} (${departureAirport.code})`
            : `Airport #${booking.departureAirportId}`}
        </p>

        <p>
          <strong>To:</strong>{" "}
          {arrivalAirport
            ? `${arrivalAirport.title} (${arrivalAirport.code})`
            : `Airport #${booking.arrivalAirportId}`}
        </p>

        <p>
          <strong>Dates:</strong> {booking.departureDate.slice(0, 10)} →{" "}
          {booking.returnDate.slice(0, 10)}
        </p>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
