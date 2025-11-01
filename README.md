# 🛫 Plane Ticket Booking Frontend

A clean, minimal **React + TypeScript** application for booking and managing plane tickets.  
It consumes a public REST API to create, list, view, and delete bookings with full form validation, paginated scrolling, and a responsive UI built with plain CSS.

---

## Features

### Functional Requirements

- **Create a new booking**

  - Form fields: First Name, Last Name, Departure Airport, Arrival Airport, Departure Date, Return Date.
  - All fields are required and validated.
  - Ensures:
    - Return date is after the departure date.
    - Departure and arrival airports are different.
  - Validation errors appear under each field (no alert popups).
  - Submits a POST request to the API and refreshes the booking list.

- **List existing bookings**

  - Displays all bookings in a styled table.
  - Supports **infinite scrolling** — fetches the next page when scrolled to the bottom.
  - Each booking row is clickable and opens a modal with full booking details.

- **Delete bookings**

  - Each booking has a red “Delete” button.
  - Upon deletion, the list refreshes automatically.

- **View booking details**

  - Opens in a centered modal window.
  - Shows all booking fields with airport names and codes instead of IDs.

- **Airports dropdown**

  - Departure and arrival airports are populated dynamically from a separate API endpoint.
  - Dropdowns display airport names and IATA codes.

- **Navigation**
  - Topbar navigation with links to:
    - “Create Booking” page (main form)
    - “All Bookings” page (list view)
  - The navbar is full-width, sticky, and responsive.

---

## Non-Functional Requirements

| Category            | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| **Performance**     | The app supports pagination for scalability with large data sets.          |
| **Usability**       | Clean, accessible form design with inline validation feedback.             |
| **Responsiveness**  | Fully responsive layout that adapts to desktop and mobile screens.         |
| **Maintainability** | Built with modular components and centralized CSS variables for theming.   |
| **Security**        | Uses a Bearer-like API key (`authToken`) in query params for API requests. |
| **Scalability**     | Ready for theming (dark/light) via CSS variables.                          |
| **Extensibility**   | Easy to extend with routing or backend features.                           |

---

## 🧱 Tech Stack

| Layer                | Technology                      |
| -------------------- | ------------------------------- |
| **Framework**        | React 18 (via Vite)             |
| **Language**         | TypeScript                      |
| **Routing**          | React Router v7                 |
| **State Management** | React Hooks                     |
| **Styling**          | Plain CSS with variables        |
| **API**              | Fetch API — REST endpoints      |
| **Build Tool**       | Vite                            |
| **Linting**          | ESLint + TypeScript strict mode |

---

## 🧩 Project Structure

```
src/
 ├── api/
 │    ├── airportsApi.ts
 │    └── bookingsApi.ts
 │
 ├── components/
 │    ├── BookingForm.tsx
 │    ├── BookingList.tsx
 │    ├── BookingModal.tsx
 │    └── Topbar.tsx
 │
 ├── pages/
 │    ├── CreateBookingPage.tsx
 │    └── BookingsPage.tsx
 │
 ├── styles/
 │    ├── variables.css
 │    ├── globals.css
 │    └── modal.css
 │
 ├── types/
 │    ├── Airport.ts
 │    └── Booking.ts
 │
 ├── App.tsx
 ├── main.tsx
 └── vite-env.d.ts
```

---

## 🚀 Setup & Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/kthristow/plane-booking-app.git
cd plane-booking-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the app

```bash
npm run dev
```

Then open your browser at: [http://localhost:5173](http://localhost:5173)

---

### Endpoints used:

| Purpose               | Method | Endpoint                             |
| --------------------- | ------ | ------------------------------------ |
| List bookings (paged) | GET    | /bookings?pageIndex={i}&pageSize={5} |
| Create booking        | POST   | /bookings/create                     |
| Delete booking        | DELETE | /bookings/delete/{id}                |
| Get all airports      | GET    | /airports                            |

---

## 🎨 Design System

All colors and theming are centralized in:

```
src/styles/variables.css
```

Example:

```css
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-error: #dc2626;
  --color-surface: #fff;
  --color-bg: #f7f8fa;
}
```

---

## 🧠 Key Implementation Details

- **Infinite scrolling** via onScroll with hasMore + loading flags.
- **Inline validation** with per-field errors and date/airport mismatch check.
- **Modal animations** (fade + scale) and click-outside close behavior.
- **React Router v7** for separate `/` (form) and `/bookings` (list) pages.

---

## 🧾 Non-Functional Quality Attributes

| Attribute                    | Implementation                                                       |
| ---------------------------- | -------------------------------------------------------------------- |
| **Clean Code**               | Strong TypeScript typing across all files.                           |
| **Error Handling**           | Safe try/catch around all API calls with descriptive console errors. |
| **UI Consistency**           | Centralized CSS variables for all UI states and colors.              |
| **No External Dependencies** | Only React, React Router, TypeScript, and Fetch API are used.        |
| **Accessibility**            | Semantic HTML and visible focus styles on inputs/buttons.            |

---

## 🧑‍💻 Author

**Kaloyan**  
Software Developer — passionate about clean UI, solid TypeScript, and scalable architecture.
