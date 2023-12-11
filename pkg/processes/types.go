package processes

type Architecture int

const (
	ArchUnknown Architecture = iota
	ArchX86
	ArchX64
)

type Process struct {
	Desc string       `json:"desc"`
	Exe  string       `json:"name"`
	Icon string       `json:"icon"`
	Pid  int          `json:"pid"`
	Arch Architecture `json:"arch"`
}

/*
	typedef struct LANGANDCODEPAGE {
		WORD wLanguage;
		WORD wCodePage;
	} *lpTranslate;
*/

type LANGANDCODEPAGE struct {
	wLanguage uint16
	wCodePage uint16
}

/*
	typedef struct _ICONINFO {
	BOOL    fIcon;
	DWORD   xHotspot;
	DWORD   yHotspot;
	HBITMAP hbmMask;
	HBITMAP hbmColor;
	} ICONINFO;
*/

type ICONINFO struct {
	fIcon    int32
	xHotspot uint32
	yHotspot uint32
	hbmMask  uintptr
	hbmColor uintptr
}

/*
	typedef struct tagBITMAP {
	LONG   bmType;
	LONG   bmWidth;
	LONG   bmHeight;
	LONG   bmWidthBytes;
	WORD   bmPlanes;
	WORD   bmBitsPixel;
	LPVOID bmBits;
	} BITMAP, *PBITMAP, *NPBITMAP, *LPBITMAP;
*/

type BITMAP struct {
	bmType       int32
	bmWidth      int32
	bmHeight     int32
	bmWidthBytes int32
	bmPlanes     uint16
	bmBitsPixel  uint16
	bmBits       uintptr
}

/*
	typedef struct tagBITMAPINFOHEADER {
	DWORD biSize;
	LONG  biWidth;
	LONG  biHeight;
	WORD  biPlanes;
	WORD  biBitCount;
	DWORD biCompression;
	DWORD biSizeImage;
	LONG  biXPelsPerMeter;
	LONG  biYPelsPerMeter;
	DWORD biClrUsed;
	DWORD biClrImportant;
	} BITMAPINFOHEADER, *LPBITMAPINFOHEADER, *PBITMAPINFOHEADER;
*/

type BITMAPINFOHEADER struct {
	biSize          uint32
	biWidth         int32
	biHeight        int32
	biPlanes        uint16
	biBitCount      uint16
	biCompression   uint32
	biSizeImage     uint32
	biXPelsPerMeter int32
	biYPelsPerMeter int32
	biClrUsed       uint32
	biClrImportant  uint32
}

/*
	typedef struct tagRGBQUAD {
	BYTE rgbBlue;
	BYTE rgbGreen;
	BYTE rgbRed;
	BYTE rgbReserved;
	} RGBQUAD;
*/

type RGBQUAD struct {
	rgbBlue     byte
	rgbGreen    byte
	rgbRed      byte
	rgbReserved byte
}

/*
	typedef struct tagBITMAPINFO {
	BITMAPINFOHEADER bmiHeader;
	RGBQUAD          bmiColors[1];
	} BITMAPINFO, *LPBITMAPINFO, *PBITMAPINFO;
*/

type BITMAPINFO struct {
	bmiHeader BITMAPINFOHEADER
	bmiColors [1]RGBQUAD
}

/*
	typedef struct _SHFILEINFOW {
	HICON hIcon;
	int   iIcon;
	DWORD dwAttributes;
	WCHAR szDisplayName[MAX_PATH];
	WCHAR szTypeName[80];
	} SHFILEINFOW;
*/

type SHFILEINFOW struct {
	hIcon         uintptr
	iIcon         int32
	dwAttributes  uint32
	szDisplayName [260]uint16
	szTypeName    [80]uint16
}

type CustomIconInfo struct {
	Width        int32
	Height       int32
	BitsPerPixel uint16
}
