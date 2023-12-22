package processes

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"image"
	"image/color"
	"image/png"
	"path/filepath"
	"strings"
	"syscall"
	"unsafe"

	"golang.org/x/sync/syncmap"
)

var (
	procEnumProcesses           *syscall.LazyProc
	procOpenProcess             *syscall.LazyProc
	procCloseHandle             *syscall.LazyProc
	procIsWow64Process          *syscall.LazyProc
	procGetModuleFileNameExW    *syscall.LazyProc
	procGetFileVersionInfoSizeW *syscall.LazyProc
	procGetFileVersionInfoW     *syscall.LazyProc
	procVerQueryValueW          *syscall.LazyProc
	procSHGetFileInfoW          *syscall.LazyProc
	procGetIconInfo             *syscall.LazyProc
	procDeleteObject            *syscall.LazyProc
	procSelectObject            *syscall.LazyProc
	procGetObject               *syscall.LazyProc
	procDeleteDC                *syscall.LazyProc
	procCreateCompatibleDC      *syscall.LazyProc
	procGetDIBits               *syscall.LazyProc
	procDestroyIcon             *syscall.LazyProc
	procTerminateProcess        *syscall.LazyProc
)

var iconCache syncmap.Map

func init() {
	kernel32 := syscall.NewLazyDLL("kernel32.dll")
	versiondll := syscall.NewLazyDLL("version.dll")
	shell32dll := syscall.NewLazyDLL("shell32.dll")
	user32dll := syscall.NewLazyDLL("user32.dll")
	gdi32dll := syscall.NewLazyDLL("gdi32.dll")
	procEnumProcesses = kernel32.NewProc("K32EnumProcesses")
	procOpenProcess = kernel32.NewProc("OpenProcess")
	procCloseHandle = kernel32.NewProc("CloseHandle")
	procIsWow64Process = kernel32.NewProc("IsWow64Process")
	procGetModuleFileNameExW = kernel32.NewProc("K32GetModuleFileNameExW")
	procGetFileVersionInfoSizeW = versiondll.NewProc("GetFileVersionInfoSizeW")
	procGetFileVersionInfoW = versiondll.NewProc("GetFileVersionInfoW")
	procVerQueryValueW = versiondll.NewProc("VerQueryValueW")
	procSHGetFileInfoW = shell32dll.NewProc("SHGetFileInfoW")
	procGetIconInfo = user32dll.NewProc("GetIconInfo")
	procDeleteObject = gdi32dll.NewProc("DeleteObject")
	procSelectObject = gdi32dll.NewProc("SelectObject")
	procGetObject = gdi32dll.NewProc("GetObjectW")
	procDeleteDC = gdi32dll.NewProc("DeleteDC")
	procCreateCompatibleDC = gdi32dll.NewProc("CreateCompatibleDC")
	procGetDIBits = gdi32dll.NewProc("GetDIBits")
	procDestroyIcon = user32dll.NewProc("DestroyIcon")
	procTerminateProcess = kernel32.NewProc("TerminateProcess")
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

// processicon returns the icon for the given file.
func processicon(filename []uint16) (image.Image, error) {
	// ExtractIconExW
	var shfi SHFILEINFOW
	ret, _, _ := procSHGetFileInfoW.Call(
		uintptr(unsafe.Pointer(&filename[0])),
		FILE_ATTRIBUTE_NORMAL,
		uintptr(unsafe.Pointer(&shfi)),
		uintptr(unsafe.Sizeof(shfi)),
		SHGFI_ICON|SHGFI_LARGEICON|SHGFI_USEFILEATTRIBUTES,
	)

	if ret == 0 {
		return nil, fmt.Errorf("ExtractIconExW failed")
	}

	defer procDestroyIcon.Call(uintptr(shfi.hIcon))

	// GetIconInfo
	var iconInfo ICONINFO
	ret, _, _ = procGetIconInfo.Call(
		uintptr(shfi.hIcon),
		uintptr(unsafe.Pointer(&iconInfo)),
	)

	if ret == 0 {
		return nil, fmt.Errorf("GetIconInfo failed")
	}

	defer func() {
		procDeleteObject.Call(iconInfo.hbmColor)
		procDeleteObject.Call(iconInfo.hbmMask)
	}()

	hdc, _, _ := procCreateCompatibleDC.Call(0)

	if hdc == 0 {
		return nil, fmt.Errorf("CreateCompatibleDC failed")
	}

	defer procDeleteDC.Call(hdc)

	var iconBitmap BITMAP

	ret, _, _ = procGetObject.Call(
		iconInfo.hbmColor,
		uintptr(unsafe.Sizeof(iconBitmap)),
		uintptr(unsafe.Pointer(&iconBitmap)),
	)

	if ret == 0 {
		return nil, fmt.Errorf("GetObject failed")
	}

	var myIconInfo CustomIconInfo

	if iconInfo.hbmColor > 0 {
		var bmp BITMAP
		ret, _, _ = procGetObject.Call(
			iconInfo.hbmColor,
			uintptr(unsafe.Sizeof(bmp)),
			uintptr(unsafe.Pointer(&bmp)),
		)

		if ret == 0 {
			return nil, fmt.Errorf("GetObject failed")
		}

		myIconInfo.Width = bmp.bmWidth
		myIconInfo.Height = bmp.bmHeight
		myIconInfo.BitsPerPixel = bmp.bmBitsPixel

	} else if iconInfo.hbmMask > 0 {
		var bmp BITMAP
		ret, _, _ = procGetObject.Call(
			iconInfo.hbmMask,
			uintptr(unsafe.Sizeof(bmp)),
			uintptr(unsafe.Pointer(&bmp)),
		)

		if ret == 0 {
			return nil, fmt.Errorf("GetObject failed")
		}

		myIconInfo.Width = bmp.bmWidth
		myIconInfo.Height = bmp.bmHeight / 2
		myIconInfo.BitsPerPixel = 1
	}

	oldObj, _, _ := procSelectObject.Call(hdc, uintptr(iconInfo.hbmColor))
	defer procSelectObject.Call(hdc, oldObj)

	// Get bitmap information (assuming 32bpp)
	var bi BITMAPINFO
	bi.bmiHeader.biSize = uint32(unsafe.Sizeof(bi.bmiHeader))
	bi.bmiHeader.biWidth = int32(myIconInfo.Width)
	bi.bmiHeader.biHeight = -int32(myIconInfo.Height) // negative to indicate top-down bitmap
	bi.bmiHeader.biPlanes = 1
	bi.bmiHeader.biBitCount = 32
	bi.bmiHeader.biCompression = BI_RGB

	// Allocate buffer for pixel data
	bufSize := myIconInfo.Width * myIconInfo.Height * 4 // 4 bytes per pixel
	buf := make([]byte, bufSize)

	// Retrieve the pixel data
	ret, _, _ = procGetDIBits.Call(
		hdc,
		uintptr(iconInfo.hbmColor),
		0,
		uintptr(myIconInfo.Height),
		uintptr(unsafe.Pointer(&buf[0])),
		uintptr(unsafe.Pointer(&bi)),
		DIB_RGB_COLORS,
	)

	if ret == 0 {
		return nil, fmt.Errorf("GetDIBits failed")
	}

	img := image.NewRGBA(image.Rect(0, 0, int(myIconInfo.Width), int(myIconInfo.Height)))
	for y := int32(0); y < myIconInfo.Height; y++ {
		for x := int32(0); x < myIconInfo.Width; x++ {
			pos := (y*myIconInfo.Width + x) * 4
			r, g, b, a := buf[pos+2], buf[pos+1], buf[pos], buf[pos+3]
			img.SetRGBA(int(x), int(y), color.RGBA{R: r, G: g, B: b, A: a})
		}
	}

	return img, nil
}

// processinfo returns the process name and architecture for the given pid.
func processinfo(pid uint32) (*Process, error) {
	// OpenProcess(DWORD dwDesiredAccess, BOOL bInheritHandle, DWORD dwProcessId)
	process, _, _ := procOpenProcess.Call(
		PROCESS_QUERY_INFORMATION|PROCESS_VM_READ,
		uintptr(0),
		uintptr(pid),
	)

	if process == uintptr(INVALID_HANDLE_VALUE) {
		return nil, fmt.Errorf("OpenProcess failed")
	}

	defer procCloseHandle.Call(process)

	// check if the process is 32-bit or 64-bit
	var isWow64 uint32
	ret, _, _ := procIsWow64Process.Call(
		process,
		uintptr(unsafe.Pointer(&isWow64)),
	)

	if ret == 0 {
		return nil, fmt.Errorf("IsWow64Process failed")
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
	ret, _, _ = procGetModuleFileNameExW.Call(
		process,
		uintptr(0),
		uintptr(unsafe.Pointer(&filename[0])),
		uintptr(unsafe.Pointer(&filenameSize)),
	)

	if ret == 0 {
		return nil, fmt.Errorf("GetModuleFileNameExW failed")
	}

	//GetFileVersionInfoSizeW
	var versionInfoSize uint32

	ret, _, err := procGetFileVersionInfoSizeW.Call(
		uintptr(unsafe.Pointer(&filename[0])),
		uintptr(0),
	)

	versionInfoSize = uint32(ret)

	if versionInfoSize == 0 {
		return nil, fmt.Errorf("GetFileVersionInfoSizeW failed %v", err)
	}

	//GetFileVersionInfoW
	var versionInfo = make([]uint16, versionInfoSize)
	ret, _, _ = procGetFileVersionInfoW.Call(
		uintptr(unsafe.Pointer(&filename[0])),
		uintptr(0),
		uintptr(versionInfoSize),
		uintptr(unsafe.Pointer(&versionInfo[0])),
	)

	if ret == 0 {
		return nil, fmt.Errorf("GetFileVersionInfoW failed")
	}

	//VerQueryValueW
	var lpBuffer uintptr
	var puLen uint32

	translateVal, _ := syscall.UTF16PtrFromString("\\VarFileInfo\\Translation")

	ret, _, err = procVerQueryValueW.Call(
		uintptr(unsafe.Pointer(&versionInfo[0])),
		uintptr(unsafe.Pointer(translateVal)),
		uintptr(unsafe.Pointer(&lpBuffer)),
		uintptr(unsafe.Pointer(&puLen)),
	)

	if ret == 0 {
		return nil, fmt.Errorf("VerQueryValueW failed %v", err)
	}

	// lpBuffer is a pointer to an array of LANGANDCODEPAGE structures.

	var langCodes = (*LANGANDCODEPAGE)(unsafe.Pointer(lpBuffer))

	fileDescVal, _ := syscall.UTF16PtrFromString(fmt.Sprintf("\\StringFileInfo\\%04x%04x\\FileDescription", langCodes.wLanguage, langCodes.wCodePage))

	var fdescBuf uintptr
	var fdescLen uint32

	procVerQueryValueW.Call(
		uintptr(unsafe.Pointer(&versionInfo[0])),
		uintptr(unsafe.Pointer(fileDescVal)),
		uintptr(unsafe.Pointer(&fdescBuf)),
		uintptr(unsafe.Pointer(&fdescLen)),
	)

	var exeDesc string
	if fdescLen != 0 {
		exeDesc = syscall.UTF16ToString((*[1 << 16]uint16)(unsafe.Pointer(fdescBuf))[:fdescLen])
	} else {
		exeDesc = ""
	}
	exePath := syscall.UTF16ToString(filename[:filenameSize])
	exeName := filepath.Base(exePath)

	if _, ok := iconCache.Load(exePath); !ok {

		exeIcon, err := processicon(filename[:filenameSize])
		if err != nil {
			return nil, fmt.Errorf("processicon failed")
			// panic(err)
		}

		var b bytes.Buffer
		err = png.Encode(&b, exeIcon)
		if err != nil {
			return nil, fmt.Errorf("png.Encode failed")
		}

		iconCache.Store(exePath, fmt.Sprintf("data:image/png;base64,%s", base64.StdEncoding.EncodeToString(b.Bytes())))

	}

	icon, _ := iconCache.Load(exePath)

	if exeDesc == "" {
		exeDesc = strings.Replace(exeName, ".exe", "", -1)
	}

	return &Process{
		Pid:  int(pid),
		Exe:  exeName,
		Desc: exeDesc,
		Arch: arch,
		Icon: icon.(string),
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

func TerminateProcess(pid int) error {
	proc, err := syscall.OpenProcess(PROCESS_ALL_ACCESS, false, uint32(pid))
	if err != nil {
		return err
	}
	defer syscall.CloseHandle(proc)
	procTerminateProcess.Call(uintptr(proc), 0)
	return nil
}

func AttachProcess(pid int) error {
	proc, err := syscall.OpenProcess(PROCESS_ALL_ACCESS, false, uint32(pid))
	if err != nil {
		return err
	}
	AttachedProcessId = pid
	AttachedProcessHandle = uintptr(proc)
	return nil
}
