import { Link, useLocation } from "react-router";

export default function Topbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h1 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Flight Booker</h1>
      <div className="links">
        <Link
          to="/"
          style={{
            textDecoration: location.pathname === "/" ? "underline" : "none",
          }}
        >
          Book Ticket
        </Link>
        <Link
          to="/bookings"
          style={{
            textDecoration:
              location.pathname === "/bookings" ? "underline" : "none",
          }}
        >
          All Bookings
        </Link>
      </div>
    </nav>
  );
}
