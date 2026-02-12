package ui

import (
	"fmt"
	"goDo/model"

	tea "github.com/charmbracelet/bubbletea"
)

type Model struct {
	tasks  []model.Task
	cursor int
}

func InitialModel() Model {
	return Model{
		tasks: []model.Task{
			{"Learn Go Basics", false},
			{"Build TUI Project", false},
		},
		cursor: 0,
	}
}

func (m Model) Init() tea.Cmd {
	return nil
}

func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c", "q":
			return m, tea.Quit
		case "up":
			if m.cursor > 0 {
				m.cursor--
			}
		case "down":
			if m.cursor < len(m.tasks)-1 {
				m.cursor++
			}
		case " ":
			m.tasks[m.cursor].Completed = !m.tasks[m.cursor].Completed
		}
	}

	return m, nil
}

func (m Model) View() string {
	s := "📝 GoDo - To Do List\n\n"

	for i, task := range m.tasks {

		cursor := " "
		if m.cursor == i {
			cursor = ">"
		}

		status := "[ ]"
		if task.Completed {
			status = "[X]"
		}

		s += fmt.Sprintf("%s %s %s\n", cursor, status, task.Title)
	}

	s += "\n↑/↓ move • space toggle • q quit\n"

	return s
}
