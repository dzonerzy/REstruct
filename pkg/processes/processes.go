package processes

import (
	"fmt"
	"syscall"
	"unsafe"
)

var (
	procEnumProcesses       *syscall.LazyProc
	procOpenProcess         *syscall.LazyProc
	procCloseHandle         *syscall.LazyProc
	procGetModuleBase       *syscall.LazyProc
	procIsWow64Process      *syscall.LazyProc
	procGetModuleFileNameEx *syscall.LazyProc
	procSHGetFileInfoW      *syscall.LazyProc
)

func init() {
	kernel32 := syscall.NewLazyDLL("kernel32.dll")
	shell32 := syscall.NewLazyDLL("shell32.dll")
	procEnumProcesses = kernel32.NewProc("K32EnumProcesses")
	procOpenProcess = kernel32.NewProc("OpenProcess")
	procCloseHandle = kernel32.NewProc("CloseHandle")
	procGetModuleBase = kernel32.NewProc("K32GetModuleBaseNameW")
	procIsWow64Process = kernel32.NewProc("IsWow64Process")
	procGetModuleFileNameEx = kernel32.NewProc("K32GetModuleFileNameExW")
	procSHGetFileInfoW = shell32.NewProc("SHGetFileInfoW")
}

// enumerate returns a list of process ids for all running processes.
func enumerate() ([]uint32, error) {
	count := 256
	uint32Size := unsafe.Sizeof(uint32(0))
	for {
		buf := make([]uint32, count)
		bufferSize := uint32(len(buf) * int(uint32Size))
		retBufferSize := uint32(0)

		ret, _, err := procEnumProcesses.Call(
			uintptr(unsafe.Pointer(&buf[0])),
			uintptr(bufferSize),
			uintptr(unsafe.Pointer(&retBufferSize)),
		)

		if ret == 0 {
			return nil, err
		}

		if retBufferSize == bufferSize {
			count = count * 2
			continue
		}
		actualCount := retBufferSize / uint32(uint32Size)
		return buf[:actualCount], nil
	}
}

// processinfo returns the process name and architecture for the given pid.
func processinfo(pid uint32) (*Process, error) {
	// OpenProcess(DWORD dwDesiredAccess, BOOL bInheritHandle, DWORD dwProcessId)
	process, _, err := procOpenProcess.Call(
		PROCESS_QUERY_INFORMATION|PROCESS_VM_READ,
		uintptr(0),
		uintptr(pid),
	)

	if process == uintptr(INVALID_HANDLE_VALUE) {
		return nil, err
	}

	defer procCloseHandle.Call(process)

	var buffer [1024]uint16
	var bufferSize uint32 = uint32(len(buffer))

	ret, _, err := procGetModuleBase.Call(
		process,
		uintptr(0),
		uintptr(unsafe.Pointer(&buffer[0])),
		uintptr(unsafe.Pointer(&bufferSize)),
	)

	if ret == 0 {
		return nil, err
	}

	// check if the process is 32-bit or 64-bit
	var isWow64 uint32
	ret, _, err = procIsWow64Process.Call(
		process,
		uintptr(unsafe.Pointer(&isWow64)),
	)

	if ret == 0 {
		return nil, err
	}

	var arch Architecture
	if isWow64 == 0 {
		arch = ArchX64
	} else {
		arch = ArchX86
	}

	// get module file name
	var filename [1024]uint16
	var filenameSize uint32 = uint32(len(filename))
	ret, _, err = procGetModuleFileNameEx.Call(
		process,
		uintptr(0),
		uintptr(unsafe.Pointer(&filename[0])),
		uintptr(unsafe.Pointer(&filenameSize)),
	)

	if ret == 0 {
		panic(err)
		return nil, err
	}

	// file description
	var info SHFILEINFOA
	ret, _, err = procSHGetFileInfoW.Call(
		uintptr(unsafe.Pointer(&filename[0])),
		0,
		uintptr(unsafe.Pointer(&info)),
		uintptr(unsafe.Sizeof(info)),
		uintptr(SHGFI_DISPLAYNAME),
	)

	if ret == 0 {
		panic(err)
		return nil, err
	}

	fmt.Println(syscall.UTF16ToString(info.szDisplayName[:]))

	return &Process{
		Pid:  int(pid),
		Name: syscall.UTF16ToString(buffer[:]),
		Arch: arch,
	}, nil
}

func GetProcesses() ([]*Process, error) {
	pids, err := enumerate()
	if err != nil {
		return nil, err
	}

	var processes []*Process
	for _, pid := range pids {
		process, err := processinfo(pid)
		if err != nil {
			continue
		}
		processes = append(processes, process)
	}

	return processes, nil
}
