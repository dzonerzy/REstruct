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

  /** Wrapper of `sendJsonMessage` from `useWebSocket` hook
   *
   * @description It enforces the request to be serializable into a proper request
   * and adds it into the `unfulfilledRequests` queue, ready to be handled by `handleResponse`
   *
   * The `handleResponse` function will remove the request from the queue once the response is received
   */
  const sendJsonMessage = <T extends GenericMessage>(message: T) => {
    const msgSerialized = message.serialize();
    setUnfulfilledRequests([...unfulfilledRequests, msgSerialized]);
    ws.sendJsonMessage(msgSerialized);
  };

  // lastJsonMessage, readyState, lastMessage, sendMessage, getWebSocket,
  return { ...ws, handleResponse, sendJsonMessage };
}
