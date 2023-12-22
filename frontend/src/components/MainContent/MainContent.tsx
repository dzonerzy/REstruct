import { Outlet } from "react-router-dom";
import "./MainContent.css";

/** Contains Outlet (the "slot" of astro for react-router-dom) */
export default function MainContent() {
  return (
    <div className="height-less-footer ml-[128px] p-4 pb-8">
      <Outlet />
    </div>
  );
}
