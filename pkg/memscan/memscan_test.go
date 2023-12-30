package memscan_test

import (
	"restruct/pkg/memscan"
	"restruct/pkg/processes"
	"syscall"
	"testing"
)

func Test_GetRemotePEB(t *testing.T) {
	// get current pid and handle

	var kernel32dll = syscall.NewLazyDLL("kernel32.dll")
	var procOpenProcess = kernel32dll.NewProc("OpenProcess")
	var procCloseHandle = kernel32dll.NewProc("CloseHandle")

	var pid = syscall.Getpid()

	var handle, _, _ = procOpenProcess.Call(uintptr(processes.PROCESS_ALL_ACCESS), uintptr(0), uintptr(pid))

	if handle == 0 {
		t.Fatal("Invalid handle")
	}

	t.Log("Handle:", handle)

	defer procCloseHandle.Call(handle)

	// get remote PEB

	remotePEB, err := memscan.GetRemotePeb(syscall.Handle(handle))

	if err != nil {
		t.Fatal(err)
	}

	if remotePEB == 0 {
		t.Fatal("Invalid PEB")
	}
}
