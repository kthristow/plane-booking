import { createBrowserRouter } from "react-router";
import App from "./App";
import FormPage from "./pages/FormPage";
import ListPage from "./pages/ListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <FormPage /> },
      { path: "/bookings", element: <ListPage /> },
    ],
  },
]);
