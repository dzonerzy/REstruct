package structure_test

import (
	"restruct/pkg/structure"
	"testing"
)

func TestStructure(t *testing.T) {
	_, err := structure.Parse(
		`struct lol {
			int a;
		};`)

	if err != nil {
		t.Fatal(err)
	}
}
