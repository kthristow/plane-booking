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

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    departureAirportId: "",
    arrivalAirportId: "",
    departureDate: "",
    returnDate: "",
    dateValidation: "",
  });

  const resetErrors = () =>
    setErrors({
      firstName: "",
      lastName: "",
      departureAirportId: "",
      arrivalAirportId: "",
      departureDate: "",
      returnDate: "",
      dateValidation: "",
    });

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      departureAirportId: "",
      arrivalAirportId: "",
      departureDate: "",
      returnDate: "",
      dateValidation: "",
    };

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (form.departureAirportId === 0)
      newErrors.departureAirportId = "Please select a departure airport.";
    if (form.arrivalAirportId === 0)
      newErrors.arrivalAirportId = "Please select an arrival airport.";
    if (!form.departureDate)
      newErrors.departureDate = "Please choose a departure date.";
    if (!form.returnDate) newErrors.returnDate = "Please choose a return date.";

    if (form.departureDate && form.returnDate) {
      const dep = new Date(form.departureDate);
      const ret = new Date(form.returnDate);
      if (ret < dep)
        newErrors.dateValidation =
          "Return date must be after the departure date.";
    }

    // Check same airport rule
    if (
      form.departureAirportId !== 0 &&
      form.arrivalAirportId !== 0 &&
      form.departureAirportId === form.arrivalAirportId
    ) {
      newErrors.dateValidation =
        "Departure and arrival airports must be different.";
    }

    return newErrors;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetErrors();

    const newErrors = validateForm();
    const hasErrors = Object.values(newErrors).some((v) => v !== "");

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      await createBooking(form);
      setForm({
        firstName: "",
        lastName: "",
        departureAirportId: 0,
        arrivalAirportId: 0,
        departureDate: "",
        returnDate: "",
      });
      onCreated();
    } catch (err) {
      console.error("Failed to create booking:", err);
      setErrors((prev) => ({
        ...prev,
        dateValidation: "Something went wrong while creating the booking.",
      }));
    }
  }

  const handleChange = <K extends keyof typeof form>(
    field: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

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
        {errors.firstName && <p className="error-text">{errors.firstName}</p>}
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        {errors.lastName && <p className="error-text">{errors.lastName}</p>}
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
          <p className="error-text">{errors.departureAirportId}</p>
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
          <p className="error-text">{errors.arrivalAirportId}</p>
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
          <p className="error-text">{errors.departureDate}</p>
        )}
      </div>

      <div className="form-group">
        <label>Return Date:</label>
        <input
          type="date"
          value={form.returnDate}
          onChange={(e) => handleChange("returnDate", e.target.value)}
        />
        {errors.returnDate && <p className="error-text">{errors.returnDate}</p>}
      </div>

      {errors.dateValidation && (
        <p className="error-text form-bottom-error">{errors.dateValidation}</p>
      )}

      <button type="submit">Book Flight</button>
    </form>
  );
}
