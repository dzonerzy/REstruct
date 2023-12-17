package ws

type Command int

const (
	COMMAND_ATTACH Command = iota
	COMMAND_DETACH
)

type GenericMessage struct {
	Command Command `json:"command"`
}

type MessageAttach struct {
	GenericMessage
	ProcessId int `json:"processId"`
}

type MessageDetach struct {
	GenericMessage
	ProcessId int `json:"processId"`
}
