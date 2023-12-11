package structure_test

import (
	"restruct/pkg/structure"
	"testing"
)

func TestStructure(t *testing.T) {
	_, err := structure.Parse(`typedef struct {
		int a;
		int b;
	} MY_STRUCT, *PMY_STRUCT;`)

	if err != nil {
		t.Fatal(err)
	}

}
