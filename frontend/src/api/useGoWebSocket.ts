import { Dispatch, SetStateAction, useState } from "react";
import useWebSocket from "react-use-websocket";
import { Command, GenericMessage, GoWsRequest, GoWsResponse } from "./useGoWebSocket.types";

export default function useGoWebSocket(setErrorMsg: Dispatch<SetStateAction<string>>) {
  const ws = useWebSocket<GoWsResponse>("ws://localhost:8080", {
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
    onMessage: data => {
      console.log("websocket data", data);
    },
    onReconnectStop(numAttempts) {
      console.log("websocket reconnect stop", numAttempts);
    },
  });
  const [unfulfilledRequests, setUnfulfilledRequests] = useState<GoWsRequest<Command>[]>([]);

  // useEffect(() => {
  //   console.log("unfulfilledRequests", unfulfilledRequests);
  // }, [unfulfilledRequests]);

  /** @returns `res.success` value */
  const handleResponse = (res: GoWsResponse): boolean => {
    setUnfulfilledRequests(unfulfilledRequests.filter(req => req.id !== res.rId));
    setErrorMsg(res.error);

    return res.success;
  };

  const sendJsonMessage = <T extends GenericMessage>(message: T) => {
    const msgSerialized = message.serialize();
    setUnfulfilledRequests([...unfulfilledRequests, msgSerialized]);
    ws.sendJsonMessage(msgSerialized);
  };

  // lastJsonMessage, readyState, lastMessage, sendMessage, getWebSocket,
  return { ...ws, handleResponse, sendJsonMessage };
}
