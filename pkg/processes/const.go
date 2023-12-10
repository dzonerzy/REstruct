package processes

import "syscall"

const (
	// PROCESS_QUERY_INFORMATION is a flag for OpenProcess that grants
	// access to the process name.
	PROCESS_QUERY_INFORMATION = 0x0400
	// PROCESS_VM_READ is a flag for OpenProcess that grants access to
	// the process memory.
	PROCESS_VM_READ = 0x0010
	// PROCESS_ALL_ACCESS is a flag for OpenProcess that grants all
	// access to the process.
	PROCESS_ALL_ACCESS = 0x1F0FFF
	// INVALID_HANDLE_VALUE is a handle value that is used to indicate
	// an invalid handle.
	INVALID_HANDLE_VALUE = syscall.InvalidHandle
	// SHGFI_TYPENAME is a flag for SHGetFileInfo that returns the
	// type name.
	SHGFI_TYPENAME = 0x000000400
	// SHGFI_ICON is a flag for SHGetFileInfo that returns the icon.
	SHGFI_ICON = 0x000000100
	// SHGFI_DISPLAYNAME is a flag for SHGetFileInfo that returns the
	// display name.
	SHGFI_DISPLAYNAME = 0x000000200
)
