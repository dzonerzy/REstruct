import { useContext, useEffect } from "react";
import { GlobalCtx } from "../../App";
import Logo from "../../components/Logo/Logo";

export default function Home() {
  const {
    footer: [_, setMsg],
  } = useContext(GlobalCtx);

  useEffect(() => {
    setMsg("Home");
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <span className="flex text-3xl font-bold text-white">
        Welcome to&nbsp;
        <span className="flex flex-col">
          <Logo />
          <span className="underline-animation" />
        </span>
      </span>
    </div>
  );
}
