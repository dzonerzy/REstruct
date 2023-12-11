package structure

type FieldType int

const (
	Unknown FieldType = iota
	Structure
	Union
	Enum
	Pointer
	Array
	Bitfield
	Char
	Bool
	Int
	Float
	Double
)

type Struct struct {
	Fields []Field `json:"fields"`
}

type Field struct {
	Identifiers string    `json:"name"`
	Type        FieldType `json:"type"`
	Size        int       `json:"size"`
}
