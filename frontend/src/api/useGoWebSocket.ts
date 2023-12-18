import useWebSocket from "react-use-websocket";
import { GenericMessage, MessageAttach } from "./useGoWebSocket.types";

export default function useGoWebSocket() {
  const ws = useWebSocket("ws://localhost:8080", {
    share: true,
    shouldReconnect: () => true,
    reconnectAttempts: 5,
    reconnectInterval: 3000,
    onOpen: () => {
      console.log("websocket opened");
    },
    onClose: () => {
      console.log("websocket closed");
    },
    onError: () => {
      console.log("websocket error");
    },
  });

  const sendJsonMessage = <T extends GenericMessage>(message: T) => {
    ws.sendJsonMessage(message.serialize());
  };

  // lastJsonMessage, readyState, lastMessage, sendMessage, getWebSocket,
  return { ...ws, sendJsonMessage };
}
