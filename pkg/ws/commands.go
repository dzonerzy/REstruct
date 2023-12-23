package ws

import (
	"encoding/json"
)

type Command int

const (
	COMMAND_ATTACH Command = iota
	COMMAND_DETACH
	REPONSE Command = 0x7f
)

type Message interface {
	Encode() ([]byte, error)
}

type GenericMessage struct {
	Command Command `json:"command"`
}

func (m *GenericMessage) ToMessageAttach(msg []byte) (*MessageAttach, error) {
	var attach = new(MessageAttach)
	err := json.Unmarshal(msg, attach)
	if err != nil {
		return nil, err
	}

	return attach, nil
}

func (m *GenericMessage) ToMessageDetach(msg []byte) (*MessageDetach, error) {
	var detach = new(MessageDetach)
	err := json.Unmarshal(msg, detach)
	if err != nil {
		return nil, err
	}

	return detach, nil
}

type MessageAttach struct {
	GenericMessage
	ProcessId int `json:"processId"`
}

type MessageDetach struct {
	GenericMessage
	ProcessId int `json:"processId"`
}

type MessageResponse struct {
	Error any `json:"error"`
	GenericMessage
	Success bool `json:"success"`
}

func (m *GenericMessage) Encode() ([]byte, error) {
	return json.Marshal(m)
}

func (m *MessageAttach) Encode() ([]byte, error) {
	return json.Marshal(m)
}

func (m *MessageDetach) Encode() ([]byte, error) {
	return json.Marshal(m)
}

func (m *MessageResponse) Encode() ([]byte, error) {
	return json.Marshal(m)
}

func NewMessageAttach(processId int) Message {
	return &MessageAttach{
		GenericMessage: GenericMessage{
			Command: COMMAND_ATTACH,
		},
		ProcessId: processId,
	}
}

func NewMessageDetach(processId int) Message {
	return &MessageDetach{
		GenericMessage: GenericMessage{
			Command: COMMAND_DETACH,
		},
		ProcessId: processId,
	}
}

func NewMessageResponse(success bool, err any) Message {
	return &MessageResponse{
		Error: err,
		GenericMessage: GenericMessage{
			Command: REPONSE,
		},
		Success: success,
	}
}
