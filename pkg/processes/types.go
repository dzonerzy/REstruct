package processes

type Architecture int

const (
	ArchUnknown Architecture = iota
	ArchX86
	ArchX64
)

type Process struct {
	Name string       `json:"name"`
	Pid  int          `json:"pid"`
	Arch Architecture `json:"arch"`
}
