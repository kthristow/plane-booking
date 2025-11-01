import { useState } from "react";
import { createBooking } from "../api/bookingsApi";
import type { Airport } from "../types/Airport";

interface Props {
  onCreated: () => void;
  airports: Airport[];
}

export default function BookingForm({ onCreated, airports }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    departureAirportId: 0,
    arrivalAirportId: 0,
    departureDate: "",
    returnDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    field: keyof typeof form,
    value: string | number
  ): void => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSuccessMessage(""); // clear success on change
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    setSuccessMessage("");

    if (!form.firstName) newErrors.firstName = "First name is required.";
    if (!form.lastName) newErrors.lastName = "Last name is required.";
    if (!form.departureAirportId)
      newErrors.departureAirportId = "Please select a departure airport.";
    if (!form.arrivalAirportId)
      newErrors.arrivalAirportId = "Please select an arrival airport.";
    if (
      form.departureAirportId &&
      form.arrivalAirportId &&
      form.departureAirportId === form.arrivalAirportId
    )
      newErrors.arrivalAirportId =
        "Departure and arrival airports must differ.";
    if (!form.departureDate)
      newErrors.departureDate = "Please choose a departure date.";
    if (!form.returnDate) newErrors.returnDate = "Please choose a return date.";
    if (
      form.departureDate &&
      form.returnDate &&
      new Date(form.returnDate) < new Date(form.departureDate)
    )
      newErrors.returnDate = "Return date must be after departure date.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createBooking(form);
      setSuccessMessage("✅ Booking created successfully!");
      setForm({
        firstName: "",
        lastName: "",
        departureAirportId: 0,
        arrivalAirportId: 0,
        departureDate: "",
        returnDate: "",
      });
      onCreated();
    } catch {
      setErrors({
        global: "Something went wrong while creating your booking.",
      });
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create Booking</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        {errors.firstName && (
          <div className="error-text">{errors.firstName}</div>
        )}
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        {errors.lastName && <div className="error-text">{errors.lastName}</div>}
      </div>
      <div className="form-group">
        <label>Departure Airport:</label>
        <select
          value={form.departureAirportId}
          onChange={(e) =>
            handleChange("departureAirportId", Number(e.target.value))
          }
        >
          <option value={0}>Select...</option>
          {airports.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title} ({a.code})
            </option>
          ))}
        </select>
        {errors.departureAirportId && (
          <div className="error-text">{errors.departureAirportId}</div>
        )}
      </div>

      <div className="form-group">
        <label>Arrival Airport:</label>
        <select
          value={form.arrivalAirportId}
          onChange={(e) =>
            handleChange("arrivalAirportId", Number(e.target.value))
          }
        >
          <option value={0}>Select...</option>
          {airports.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title} ({a.code})
            </option>
          ))}
        </select>
        {errors.arrivalAirportId && (
          <div className="error-text">{errors.arrivalAirportId}</div>
        )}
      </div>
      <div className="form-group">
        <label>Departure Date:</label>
        <input
          type="date"
          value={form.departureDate}
          onChange={(e) => handleChange("departureDate", e.target.value)}
        />
        {errors.departureDate && (
          <div className="error-text">{errors.departureDate}</div>
        )}
      </div>
      <div className="form-group">
        <label>Return Date:</label>
        <input
          type="date"
          value={form.returnDate}
          onChange={(e) => handleChange("returnDate", e.target.value)}
        />
        {errors.returnDate && (
          <div className="error-text">{errors.returnDate}</div>
        )}
      </div>

      <button type="submit">Book Flight</button>
      {errors.global && <div className="error-banner">{errors.global}</div>}
      {successMessage && <div className="success-banner">{successMessage}</div>}
    </form>
  );
}
