package ws

import (
	"encoding/json"
	"math/rand"
	"time"
)

const (
	COMMAND_ATTACH Command = iota
	COMMAND_DETACH
	REPONSE Command = 0x7f
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

type Command int

type MessageId uint16

type MessageIdetifier struct {
	MessageId MessageId `json:"id"`
}

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
	MessageIdetifier
	GenericMessage
	ProcessId int `json:"processId"`
}

type MessageDetach struct {
	MessageIdetifier
	GenericMessage
	ProcessId int `json:"processId"`
}

type MessageResponse struct {
	Error      any       `json:"error"`
	ResponseTo MessageId `json:"rId"`
	Success    bool      `json:"success"`
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

func randMessageId() MessageId {
	return MessageId(rand.Uint32() % 0xffff)
}

func NewMessageAttach(processId int) Message {
	return &MessageAttach{
		MessageIdetifier: MessageIdetifier{
			MessageId: randMessageId(),
		},
		GenericMessage: GenericMessage{
			Command: COMMAND_ATTACH,
		},
		ProcessId: processId,
	}
}

func NewMessageDetach(processId int) Message {
	return &MessageDetach{
		MessageIdetifier: MessageIdetifier{
			MessageId: randMessageId(),
		},
		GenericMessage: GenericMessage{
			Command: COMMAND_DETACH,
		},
		ProcessId: processId,
	}
}

func NewMessageResponse(success bool, err any, responseTo MessageId) Message {
	return &MessageResponse{
		Error:      err,
		ResponseTo: responseTo,
		Success:    success,
	}
}
