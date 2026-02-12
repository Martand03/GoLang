package main

import (
	"fmt"
	"goDo/ui"
	"os"

	tea "github.com/charmbracelet/bubbletea"
)

func main() {
	p := tea.NewProgram(ui.InitialModel())
	if err := p.Start(); err != nil {
		fmt.Println("Error: ", err)
		os.Exit(1)
	}
}
