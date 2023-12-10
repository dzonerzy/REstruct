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

/*
	typedef struct _SHFILEINFOA {
	HICON hIcon;
	int   iIcon;
	DWORD dwAttributes;
	CHAR  szDisplayName[MAX_PATH];
	CHAR  szTypeName[80];
	} SHFILEINFOA;
*/

type SHFILEINFOA struct {
	hIcon         uintptr
	iIcon         int32
	dwAttributes  uint32
	szDisplayName [260]uint16
	szTypeName    [80]uint16
}
