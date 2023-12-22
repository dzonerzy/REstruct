import { Outlet } from "react-router-dom";

/** Contains Outlet (the "slot" of astro for react-router-dom) */
export default function MainContent() {
  return (
    <div className="h-screen p-4 sm:ml-64">
      <Outlet />
    </div>
  );
}
