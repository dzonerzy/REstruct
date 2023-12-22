import { Sidebar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function SidebarWrapper() {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");
  const goToProcesses = () => navigate("/processes");

  return (
    <Sidebar className="fixed">
      <Sidebar.CTA className="mb-2 !bg-slate-900 p-2 text-center font-mono text-xl font-bold text-blue-950">
        REstruct
      </Sidebar.CTA>
      <div className="h-px bg-slate-900/[0.6]" />
      <Sidebar.Items className="border-none">
        <Sidebar.ItemGroup>
          <Sidebar.Item className="cursor-pointer" onClick={goToHome}>
            Home
          </Sidebar.Item>
          <Sidebar.Item className="cursor-pointer" onClick={goToProcesses}>
            Processes
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
