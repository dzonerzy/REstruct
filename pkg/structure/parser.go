package structure

import (
	"context"
	"fmt"

	sitter "github.com/smacker/go-tree-sitter"
	"github.com/smacker/go-tree-sitter/c"
)

var (
	Parser *sitter.Parser
	Lang   *sitter.Language
)

func init() {
	Parser = sitter.NewParser()
	Lang = c.GetLanguage()
	Parser.SetLanguage(Lang)
}

func getMissingOrError(node *sitter.Node, data []byte) error {
	// loop through children
	for i := 0; i < int(node.ChildCount()); i++ {
		child := node.Child(i)
		// if child is missing or has an error
		if child.IsMissing() || child.IsError() {
			// return error
			var errType string
			var row uint32
			var col uint32
			var character string

			if child.IsMissing() {
				errType = "missing"
				row = child.StartPoint().Row + 1
				col = child.StartPoint().Column
				character = child.Type()
				return fmt.Errorf("%s %s at line %d column %d", errType, character, row, col)
			} else {
				errType = "syntax error"
				row = child.EndPoint().Row
				col = child.EndPoint().Column
				character = child.Content(data)
				return fmt.Errorf("%s near %s at line %d column %d", errType, character, row, col)
			}
		} else {
			// check child's children
			err := getMissingOrError(child, data)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func Parse(data string) ([]interface{}, error) {
	src := []byte(data)
	root, err := Parser.ParseCtx(context.Background(), nil, src)

	if err != nil {
		return nil, err
	}

	fmt.Println(root.RootNode().String())

	// check for errors
	if root.RootNode().HasError() {
		return nil, fmt.Errorf("error while parsing <data>, %s", getMissingOrError(root.RootNode(), src))
	}

	Transform(root.RootNode(), src)

	return nil, nil
}

/*
Tranform is used to transform tree-sitter AST to a more usable AST.

Given the following C code:

typedef struct {
	int a;
	int b;
} MY_STRUCT, *PMY_STRUCT;

It translates to the following tree-sitter AST:

(translation_unit (type_definition type: (struct_specifier body: (field_declaration_list (field_declaration type: (primitive_type) declarator: (field_identifier)) (field_declaration type: (primitive_type) declarator: (field_identifier)))) declarator: (type_identifier) declarator: (pointer_declarator declarator: (type_identifier))))

Then should be interpreted as:

[
	TypeStruct{
		Name: "MY_STRUCT",
		Fields: []Field{
			Field{
				Name: "a",
				Type: TypeInt{
					Signed: true,
				},
			},
			Field{
				Name: "b",
				Type: TypeInt{
					Signed: true,
				},
			},
		},
	},
	TypeDef{
		Name: "PMY_STRUCT",
		Type: TypePointer64 {
			PointerTo: <TypeStruct MY_STRUCT>,
		},
	},
]

Another example:

enum Test {
	ONE = 1,
	TWO = 2,
	THREE = 3,
};

[
	TypeEnum{
		Name: "Test",
		Fields: []EnumField{
			EnumField{
				Name: "ONE",
				Value: 1,
			},
			EnumField{
				Name: "TWO",
				Value: 2,
			},
			EnumField{
				Name: "THREE",
				Value: 3,
			},
		},
	},
*/

func Transform(node *sitter.Node, data []byte) (Types, error) {
	var t Types
	enum := TypeEnum{
		Name: "MY_ENUM",
		Fields: []EnumField{
			{
				Name:  "ONE",
				Value: 1,
			},
			{
				Name:  "TWO",
				Value: 2,
			},
			{
				Name:  "THREE",
				Value: 3,
			},
		},
	}
	structure := TypeStruct{
		Name: "MY_STRUCT",
		Fields: []Field{
			{
				Name: "a",
				Type: TypeInt{
					Signed: true,
				},
			},
			{
				Name: "b",
				Type: TypeInt{
					Signed: true,
				},
			},
			{
				Name: "c",
				Type: enum,
			},
		},
	}
	t = append(t, structure)
	t = append(t, enum)
	s, _ := t.Json()
	fmt.Println(s)
	return nil, nil
}
