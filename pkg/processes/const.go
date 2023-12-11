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
	// BI_RGB is a flag for CreateDIBSection that specifies that the
	// bitmap is in uncompressed red green blue (RGB) format that is
	// not compressed and does not use color masks.
	BI_RGB = 0
	// GHND is a flag for GlobalAlloc that combines GMEM_MOVEABLE and GMEM_ZEROINIT.
	GHND = 0x0042
	// FILE_ATTRIBUTE_NORMAL is a flag for CreateFile that specifies
	// that the file is being opened or created for asynchronous I/O.
	FILE_ATTRIBUTE_NORMAL = 0x00000080
	// SHGFI_USEFILEATTRIBUTES is a flag for SHGetFileInfo that
	// specifies that the dwFileAttributes member of the SHFILEINFO
	// structure is valid.
	SHGFI_USEFILEATTRIBUTES = 0x000000010
	// SHGFI_ICON is a flag for SHGetFileInfo that specifies that the
	// hIcon member of the SHFILEINFO structure is valid.
	SHGFI_ICON = 0x000000100
	// SHGFI_SMALLICON is a flag for SHGetFileInfo that specifies that
	// the small icon should be extracted.
	SHGFI_SMALLICON = 0x000000001
	// SHGFI_LARGEICON is a flag for SHGetFileInfo that specifies that
	// the large icon should be extracted.
	SHGFI_LARGEICON = 0x000000000
	// DI_NORMAL is a flag for DrawIconEx that specifies that the icon
	// is drawn using the width and height specified by the system
	// metric values for icons.
	DI_NORMAL = 0x0003
	// DIB_RGB_COLORS is a flag for GetDIBits that specifies that the
	// color table should consist of arrays of red, green, and blue
	// intensities.
	DIB_RGB_COLORS = 0
)
