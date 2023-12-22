import MainContent from "../components/MainContent/MainContent";
import { useContext } from "react";
import { GlobalCtx } from "../App";
import SidebarWrapper from "../components/Sidebar/Sidebar";

export default function Layout() {
  const {
    footer: [msg],
  } = useContext(GlobalCtx);

  return (
    <>
      <SidebarWrapper />
      <MainContent />
      <footer className="fixed bottom-0 h-6 w-screen bg-slate-700 pl-4 text-left text-slate-900">{msg}</footer>
    </>
  );
}
