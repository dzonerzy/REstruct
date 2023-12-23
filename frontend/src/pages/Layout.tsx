import MainContent from "../components/MainContent/MainContent";
import { useContext } from "react";
import { GlobalCtx } from "../App";
import SidebarWrapper from "../components/Sidebar/Sidebar";

export default function Layout() {
  const {
    footer: [msg],
  } = useContext(GlobalCtx);

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div>
          <SidebarWrapper />
        </div>
        <div className="flex-1 overflow-y-auto bg-[#1b2636]">
          <MainContent className={"p-2"} />
        </div>
      </div>

      <footer className="h-6 w-screen bg-slate-700 pl-4 text-left text-slate-900">{msg}</footer>
    </div>
  );
}
