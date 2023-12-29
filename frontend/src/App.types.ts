import { Dispatch, SetStateAction } from "react";
import { useGoWebSocket, useFooterMsg } from "./api";

export type GlobalCtxProperties = {
  ws: ReturnType<typeof useGoWebSocket>;
  footer: ReturnType<typeof useFooterMsg>;
  pid: [number, Dispatch<SetStateAction<number>>];
  errorAlert: [string, Dispatch<SetStateAction<string>>];
};
