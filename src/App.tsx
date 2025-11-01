import { Outlet } from "react-router";
import Topbar from "./components/Topbar";

export default function App() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
