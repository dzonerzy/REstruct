package memscan

import (
	"fmt"
	"syscall"
	"unsafe"
)

var (
	procVirtualQueryEx            *syscall.LazyProc
	procIsWow64Process            *syscall.LazyProc
	procNtQueryInformationProcess *syscall.LazyProc
)

func init() {
	var kernel32dll = syscall.NewLazyDLL("kernel32.dll")
	var ntdll = syscall.NewLazyDLL("ntdll.dll")
	procVirtualQueryEx = kernel32dll.NewProc("VirtualQueryEx")
	procIsWow64Process = kernel32dll.NewProc("IsWow64Process")
	procNtQueryInformationProcess = ntdll.NewProc("NtQueryInformationProcess")
}

func GetRemotePeb(process syscall.Handle) (uintptr, error) {

	var pbi PROCESS_BASIC_INFORMATION
	r, _, _ := procNtQueryInformationProcess.Call(uintptr(process), uintptr(0), uintptr(unsafe.Pointer(&pbi)), uintptr(unsafe.Sizeof(pbi)), uintptr(0))

	if r == 0 {
		return uintptr(pbi.PebBaseAddress), nil
	}

	return 0, fmt.Errorf("could not get remote PEB64")
}
