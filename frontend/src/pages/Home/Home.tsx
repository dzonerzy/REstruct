import { useContext, useEffect } from "react";
import { GlobalCtx } from "../../App";

export default function Home() {
  const {
    footer: [_, setMsg],
  } = useContext(GlobalCtx);

  useEffect(() => {
    setMsg("Home");
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <span>Home</span>
      <a href="#/b">B</a>
      <a href="#/processes">Processes</a>
    </div>
  );
}
