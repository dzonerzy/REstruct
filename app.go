package main

import (
	"context"
	"fmt"
	"restruct/pkg/processes"
	"restruct/pkg/types"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// GetProcesses returns a list of processes
func (a *App) GetProcesses() types.Response {
	procs, err := processes.GetProcesses()
	if err != nil {
		errStr := fmt.Errorf("error getting processes: %s", err.Error())
		return types.Response{Error: errStr.Error()}
	}
	return types.Response{Data: procs}
}
