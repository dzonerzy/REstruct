package processes

var (
	AttachedProcessId     int     = -1
	AttachedProcessHandle uintptr = uintptr(INVALID_HANDLE_VALUE)
)

func isAttached() bool {
	return AttachedProcessId != -1 && AttachedProcessHandle != uintptr(INVALID_HANDLE_VALUE)
}
