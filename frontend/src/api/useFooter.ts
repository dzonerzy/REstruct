import { Dispatch, SetStateAction, useState } from "react";

export default function useFooterMsg(initVal?: string): [string, Dispatch<SetStateAction<string>>] {
  const [footerMsg, setFooterMsg] = useState(initVal);
  return [footerMsg, setFooterMsg];
}
