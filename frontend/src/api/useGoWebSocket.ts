import useWebSocket from "react-use-websocket";
import { GenericMessage, GoWsResponse } from "./useGoWebSocket.types";

export default function useGoWebSocket() {
  const ws = useWebSocket<GoWsResponse>("ws://localhost:8080", {
    share: true,
    shouldReconnect: () => true,
    reconnectAttempts: 5,
    reconnectInterval: 3000,
    onOpen: () => {
      console.log("websocket onOpen");
    },
    onClose: () => {
      console.log("websocket onClose");
    },
    onError: () => {
      console.log("websocket onError");
    },
    onMessage: data => {
      console.log("websocket onMessage", data);
    },
    onReconnectStop(numAttempts) {
      console.log("websocket onReconnectStop", numAttempts);
    },
  });

  const sendJsonMessage = <T extends GenericMessage>(message: T) => {
    ws.sendJsonMessage(message.serialize());
  };

  // lastJsonMessage, readyState, lastMessage, sendMessage, getWebSocket,
  return { ...ws, sendJsonMessage };
}
