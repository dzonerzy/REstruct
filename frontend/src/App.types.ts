import { useGoWebSocket, useFooterMsg } from "./api";

export type GlobalCtxProperties = {
  ws: ReturnType<typeof useGoWebSocket>;
  footer: ReturnType<typeof useFooterMsg>;
};
