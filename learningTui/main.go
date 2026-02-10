package main

import (
	"fmt"
	"os"

	tea "github.com/charmbracelet/bubbletea"
)

type Model struct {
	count int
}

func (m Model) Init() tea.Cmd {
	return nil
}

func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "+":
			m.count++
		case "-":
			if m.count > 0 {
				m.count--
			}
		case "r":
			m.count = 0
		case "q", "ctrl+c":
			return m, tea.Quit
		}
	}
	return m, nil
}

func (m Model) View() string {

	mType := "EVEN"

	if m.count%2 != 0 {
		mType = "ODD"
	}

	return fmt.Sprintf(
		"Count: %d\n\nPress + or - \nPress q to quit\n\nType of Count: %s", m.count, mType,
	)
}

func main() {
	p := tea.NewProgram(Model{count: 0})

	if err := p.Start(); err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
}
