package structure

import "encoding/json"

func toJson(v any) (string, error) {
	j, err := json.MarshalIndent(v, "", "  ")
	if err != nil {
		return "", err
	}
	return string(j), nil
}

// Types

type TypeBool struct{}

func (t TypeBool) Size() int {
	return 1
}

func (t TypeBool) Json() (string, error) {
	return toJson(t)
}

type TypeByte struct {
	Signed bool `json:"signed"`
}

func (t TypeByte) Size() int {
	return 1
}

func (t TypeByte) Json() (string, error) {
	return toJson(t)
}

type TypeShort struct {
	Signed bool `json:"signed"`
}

func (t TypeShort) Size() int {
	return 2
}

func (t TypeShort) Json() (string, error) {
	return toJson(t)
}

type TypeInt struct {
	Signed bool `json:"signed"`
}

func (t TypeInt) Size() int {
	return 4
}

func (t TypeInt) Json() (string, error) {
	return toJson(t)
}

type TypeInt64 struct {
	Signed bool `json:"signed"`
}

func (t TypeInt64) Size() int {
	return 8
}

func (t TypeInt64) Json() (string, error) {
	return toJson(t)
}

type TypeFloat struct{}

func (t TypeFloat) Size() int {
	return 4
}

func (t TypeFloat) Json() (string, error) {
	return toJson(t)
}

type TypeDouble struct{}

func (t TypeDouble) Size() int {
	return 8
}

func (t TypeDouble) Json() (string, error) {
	return toJson(t)
}

type TypePointer32 struct {
	PointerTo Type `json:"pointer_to"`
}

func (p TypePointer32) Size() int {
	return 4
}

func (p TypePointer32) Json() (string, error) {
	return toJson(p)
}

type TypePointer64 struct {
	PointerTo Type `json:"pointer_to"`
}

func (p TypePointer64) Size() int {
	return 8
}

func (p TypePointer64) Json() (string, error) {
	return toJson(p)
}

type TypeArray struct {
	Type  Type `json:"type"`
	Count int  `json:"count"`
}

func (t TypeArray) Size() int {
	return t.Type.Size() * t.Count
}

func (t TypeArray) Json() (string, error) {
	return toJson(t)
}

type TypeStruct struct {
	Name   string  `json:"name"`
	Fields []Field `json:"fields"`
}

func (t TypeStruct) Size() int {
	size := 0
	for _, f := range t.Fields {
		size += f.Size()
	}
	return size
}

func (t TypeStruct) Json() (string, error) {
	return toJson(t)
}

type TypeUnion struct {
	Name   string       `json:"name"`
	Fields []TypeStruct `json:"fields"`
}

func (t TypeUnion) Size() int {
	size := 0
	for _, f := range t.Fields {
		size += f.Size()
	}
	return size
}

func (t TypeUnion) Json() (string, error) {
	return toJson(t)
}

type TypeEnum struct {
	Name   string      `json:"name"`
	Fields []EnumField `json:"fields"`
}

func (t TypeEnum) Size() int {
	// check greatest value
	greatest := 0
	for _, f := range t.Fields {
		if f.Value > greatest {
			greatest = f.Value
		}
	}

	// check size
	if greatest <= 0xFF {
		return 1
	}

	if greatest <= 0xFFFF {
		return 2
	}

	if greatest <= 0xFFFFFFFF {
		return 4
	}

	return 8
}

func (t TypeEnum) Json() (string, error) {
	return toJson(t)
}

type EnumField struct {
	Name  string `json:"name"`
	Value int    `json:"value"`
}

func (e EnumField) Json() (string, error) {
	return toJson(e)
}

func (e EnumField) Size() int {
	if e.Value <= 0xFF {
		return 1
	}

	if e.Value <= 0xFFFF {
		return 2
	}

	if e.Value <= 0xFFFFFFFF {
		return 4
	}

	return 8
}

type Field struct {
	Type Type   `json:"type"`
	Name string `json:"name"`
}

func (f Field) Json() (string, error) {
	return toJson(f)
}

func (f Field) Size() int {
	return f.Type.Size()
}

type TypeDef struct {
	Type Type   `json:"type"`
	Name string `json:"name"`
}

func (t TypeDef) Json() (string, error) {
	return toJson(t)
}

func (t TypeDef) Size() int {
	return t.Type.Size()
}

// End Types

type Type interface {
	Size() int
	Json() (string, error)
}

type Types []Type

func (t Types) Size() int {
	size := 0
	for _, t := range t {
		size += t.Size()
	}
	return size
}

func (t Types) Json() (string, error) {
	return toJson(t)
}
