import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import SidebarElement from "./SiderbarElement/SidebarElement";

export default function div() {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");
  const goToProcesses = () => navigate("/processes");

  return (
    <nav className="bg-[#1F2937] p-3">
      <section className="flex flex-col gap-y-2">
        <header className="text-center font-mono text-xl font-bold text-white/[.1]">
          <Logo />
        </header>
        <div className="h-px bg-slate-900/[0.6]" />
        <article className="text-black dark:text-gray-200">
          <div className="flex flex-col gap-y-2 py-2">
            <SidebarElement text="Home" iconElement={<i className="fi fi-rr-home pt-[2px]" />} onClick={goToHome} />
            <SidebarElement
              text="Processes"
              iconElement={<i className="fi fi-rr-table-list pt-[2px]" />}
              onClick={goToProcesses}
            />
            <SidebarElement
              text="Memory Inspector"
              iconElement={<i className="fi fi-rr-memory pt-[2px]" />}
              onClick={goToMemoryInspector}
            />
            <SidebarElement
              text="Local Types"
              iconElement={<i className="fi fi-rr-exchange pt-[2px]" />}
              onClick={goToLocalTypes}
            />
          </div>
        </article>
      </section>
    </nav>
  );
}
