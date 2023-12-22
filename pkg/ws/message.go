package ws

import (
	"encoding/json"

	"github.com/gorilla/websocket"
)

func decodeMesage(conn *websocket.Conn) (*GenericMessage, []byte, error) {
	var genericMessage = new(GenericMessage)

	_, msg, err := conn.ReadMessage()

	if err != nil {
		return nil, msg, err
	}

	err = json.Unmarshal(msg, genericMessage)

	if err != nil {
		return nil, msg, err
	}

	return genericMessage, msg, nil
}

func handleMessage(conn *websocket.Conn, msg *GenericMessage, b []byte) error {
	switch msg.Command {
	case COMMAND_ATTACH:
		attach, err := msg.ToMessageAttach(b)
		if err != nil {
			return err
		}
		return MesssagesHandler(conn, attach)
	case COMMAND_DETACH:
		detach, err := msg.ToMessageDetach(b)
		if err != nil {
			return err
		}
		return MesssagesHandler(conn, detach)
	default:
		return nil
	}
}

func sendResponse(conn *websocket.Conn, msg Message) error {
	data, err := msg.Encode()
	if err != nil {
		return err
	}

	return conn.WriteMessage(websocket.TextMessage, data)
}
