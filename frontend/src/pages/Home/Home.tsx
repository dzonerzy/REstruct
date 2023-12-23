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
    <div className="flex h-full items-center">
      <h1 className="text-3xl font-bold text-white">
        Welcome to <span className="text-red-200">RE</span>
        <span className="text-red-500">struct</span>
      </h1>
    </div>
  );
}
