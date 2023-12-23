import { Outlet } from "react-router-dom";
import "./MainContent.css";

/** Contains Outlet (the "slot" of astro for react-router-dom) */
export default function MainContent({ className }) {
  return (
    <div className={className}>
      <Outlet />
    </div>
  );
}
