package processes_test

import (
	"restruct/pkg/processes"
	"testing"
)

func TestGetProcesses(t *testing.T) {
	procs, err := processes.GetProcesses()
	if err != nil {
		t.Fatal(err)
	}

	if len(procs) == 0 {
		t.Fatal("No processes found")
	}

	for _, process := range procs {
		if process.Pid == 0 {
			t.Fatal("Invalid PID")
		}

		if process.Name == "" {
			t.Fatal("Invalid name")
		}

		if process.Arch == processes.ArchUnknown {
			t.Fatal("Invalid architecture")
		}
	}

	t.Log("Found", len(procs), "processes")
}
