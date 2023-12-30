package memscan

type Section struct {
	Name string `json:"name"`
	Base uint64 `json:"base"`
	Size uint64 `json:"size"`
}

type Module struct {
	Name     string    `json:"name"`
	Sections []Section `json:"sections"`
	Base     uint64    `json:"base"`
	Size     uint64    `json:"size"`
}

type PEB struct {
	InheritedAddressSpace    bool
	ReadImageFileExecOptions bool
	BeingDebugged            bool
	BitField                 uint8
}

type PEB32 struct {
	PEB
	Mutant           uint32
	ImageBaseAddress uint32
	Ldr              uint32
}

type PEB64 struct {
	PEB
	Padding0         [4]byte
	Mutant           uint64
	ImageBaseAddress uint64
	Ldr              uint64
}

type PROCESS_BASIC_INFORMATION struct {
	ExitStatus                   uint32
	Padding0                     [4]byte
	PebBaseAddress               uint64
	AffinityMask                 uint64
	BasePriority                 uint32
	Padding1                     [4]byte
	UniqueProcessId              uint64
	InheritedFromUniqueProcessId uint64
}
