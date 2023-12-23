package ws

import (
	"fmt"
	"log"
	"restruct/pkg/processes"

	"github.com/gorilla/websocket"
)

func MesssagesHandler(conn *websocket.Conn, message Message) error {
	switch msg := message.(type) {
	case *MessageAttach:
		log.Printf("Attach message received: %v\n", msg)
		if err := processes.AttachProcess(msg.ProcessId); err != nil {
			return sendResponse(conn, NewMessageResponse(
				false,
				fmt.Errorf("error attaching process: %s", err.Error()),
			))
		}
		return sendResponse(conn, NewMessageResponse(true, nil))
	case *MessageDetach:
		log.Printf("Detach message received: %v\n", msg)
		if err := processes.DetachProcess(msg.ProcessId); err != nil {
			return sendResponse(conn, NewMessageResponse(
				false,
				fmt.Errorf("error detaching process: %s", err.Error()),
			))
		}
		return sendResponse(conn, NewMessageResponse(true, nil))
	default:
		return fmt.Errorf("unknown message type: %T", msg)
	}
}
