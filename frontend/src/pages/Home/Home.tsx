import { useContext, useEffect } from "react";
import { GlobalCtx } from "../../App";

export default function Home() {
  const {
    footer: [_, setMsg],
  } = useContext(GlobalCtx);

  useEffect(() => {
    setMsg("Home");
  }, []);

  const REstruct = (
    <>
      <span className="inline-block scale-x-[-1] transform select-none text-2xl font-extrabold leading-none text-indigo-900 dark:text-indigo-100">
        R
      </span>
      <span className="inline-block scale-x-[-1] transform select-none text-2xl font-extrabold leading-none text-indigo-900 dark:text-indigo-100">
        E
      </span>
      <span className="inline-block select-none text-lg font-bold leading-none text-indigo-500 dark:text-indigo-400">
        struct
      </span>
    </>
  );

  return (
    <div className="flex h-full items-center">
      <span className="text-3xl font-bold text-white">Welcome to {REstruct}</span>
    </div>
  );
}
