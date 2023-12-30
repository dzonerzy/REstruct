package processes

import "syscall"

var (
	AttachedProcessId     int            = -1
	AttachedProcessHandle syscall.Handle = syscall.Handle(INVALID_HANDLE_VALUE)
)

func isAttached() bool {
	return AttachedProcessId != -1 && AttachedProcessHandle != syscall.Handle(INVALID_HANDLE_VALUE)
}
