import { Sidebar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";

export default function SidebarWrapper() {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");
  const goToProcesses = () => navigate("/processes");
  const goToLocalTypes = () => navigate("/local-types");

  return (
    <Sidebar className="">
      <div className="pt-2">
        <Sidebar.CTA className="mb-2 !bg-transparent p-2 text-center font-mono text-xl font-bold text-white/[.1]">
          <Logo />
        </Sidebar.CTA>
        <div className="h-px bg-slate-900/[0.6]" />
        <Sidebar.Items className="border-none">
          <Sidebar.ItemGroup>
            <Sidebar.Item className="cursor-pointer dark:hover:bg-slate-700" onClick={goToHome}>
              <div className="flex gap-x-2">
                <i className="fi fi-rr-home pt-[2px]" />
                <span>Home</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Item className="cursor-pointer dark:hover:bg-slate-700" onClick={goToProcesses}>
              <div className="flex gap-x-2">
                <i className="fi fi-rr-table-list pt-[2px]" />
                <span>Processes</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Item className="cursor-pointer dark:hover:bg-slate-700" onClick={goToLocalTypes}>
              <div className="flex gap-x-2">
                <i className="fi fi-rr-exchange pt-[2px]" />
                <span>Local Types</span>
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </div>
    </Sidebar>
  );
}
