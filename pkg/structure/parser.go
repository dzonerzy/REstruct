package structure

import (
	"context"
	"fmt"

	sitter "github.com/smacker/go-tree-sitter"
	"github.com/smacker/go-tree-sitter/c"
)

var (
	Parser *sitter.Parser
)

func init() {
	Parser = sitter.NewParser()
	Parser.SetLanguage(c.GetLanguage())
}

func Parse(data string) ([]Struct, error) {
	src := []byte(data)
	root, err := Parser.ParseCtx(context.Background(), nil, src)
	if err != nil {
		return nil, err
	}

	fmt.Println(root.RootNode().String())
	return nil, nil
}

/*
Assume the following translation unit:

(translation_unit (type_definition type: (struct_specifier body: (field_declaration_list (field_declaration type: (primitive_type) declarator: (field_identifier)) (field_declaration type: (primitive_type) declarator: (field_identifier)))) declarator: (type_identifier) declarator: (pointer_declarator declarator: (type_identifier))))

This should be converted to a Struct type:

type Struct struct {
	Name   string
	Fields []Field
}
*/
