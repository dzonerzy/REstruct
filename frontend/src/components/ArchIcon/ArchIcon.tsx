import { Architecture } from "../../api/useGo.types";

type ArchIconProps = {
  arch: Architecture;
};

export default function ArchIcon({ arch }: ArchIconProps) {
  console.log();

  switch (arch) {
    case 2:
      return (
        <div className="flex h-8 w-8 flex-col rounded-md border-[1px] border-slate-700 bg-slate-500 p-0 dark:border-slate-300 dark:bg-slate-500">
          <span className="relative top-[-4px] m-0 self-center p-0 text-base font-bold text-yellow-300">64</span>
          <span className="relative top-[-12px] m-0 self-center p-0 font-mono text-xs text-slate-200 dark:text-slate-100">
            bit
          </span>
        </div>
      );
    case 1:
      return (
        <div className="flex h-8 w-8 flex-col rounded-md border-[1px] border-slate-700 bg-slate-500 p-0 dark:border-slate-300 dark:bg-slate-500">
          <span className="relative top-[-4px] m-0 self-center p-0 text-base font-bold text-blue-300">32</span>
          <span className="relative top-[-12px] m-0 self-center p-0 font-mono text-xs text-slate-200 dark:text-slate-100">
            bit
          </span>
        </div>
      );
    case 0:
      return (
        <div className="flex h-8 w-8 flex-col rounded-md border-[1px] border-slate-700 bg-slate-500 p-0 dark:border-slate-300 dark:bg-slate-500">
          <span className="relative top-[-4px] m-0 self-center p-0 text-base font-bold text-red-300">??</span>
          <span className="relative top-[-12px] m-0 self-center p-0 font-mono text-xs text-slate-200 dark:text-slate-100">
            bit
          </span>
        </div>
      );
    default:
      console.error("Unknown architecture case");
  }
}
