package ui

import (
	"fmt"
	"goDo/model"
	"goDo/storage"

	tea "github.com/charmbracelet/bubbletea"
)

type mode int

const (
	browseMode mode = iota
	addMode
)

type Model struct {
	tasks     []model.Task
	cursor    int
	mode      mode
	inputText string
}

func InitialModel() Model {

	var tasks []model.Task

	err := storage.Load(&tasks)
	if err != nil {
		tasks = []model.Task{}
	}

	return Model{
		tasks:  tasks,
		cursor: 0,
		mode:   browseMode,
	}
}

func (m Model) Init() tea.Cmd {
	return nil
}

func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch m.mode {
		case browseMode:
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
				if len(m.tasks) > 0 {
					m.tasks[m.cursor].Completed = !m.tasks[m.cursor].Completed
					_ = storage.Save(&m.tasks)
				}
			case "a":
				m.mode = addMode
				m.inputText = ""
			}
		case addMode:
			switch msg.String() {
			case "enter":
				if m.inputText != "" {
					m.tasks = append(m.tasks, model.Task{
						Title:     m.inputText,
						Completed: false,
					})
					_ = storage.Save(&m.tasks)
				}
				m.mode = browseMode
			case "esc":
				m.mode = browseMode
			case "backspace":
				if len(m.inputText) > 0 {
					m.inputText = m.inputText[:len(m.inputText)-1]
				}
			default:
				if len(msg.String()) == 1 {
					m.inputText += msg.String()
				}
			}
		}
		//switch msg.String() {
		//case "ctrl+c", "q":
		//	return m, tea.Quit
		//case "up":
		//	if m.cursor > 0 {
		//		m.cursor--
		//	}
		//case "down":
		//	if m.cursor < len(m.tasks)-1 {
		//		m.cursor++
		//	}
		//case " ":
		//	m.tasks[m.cursor].Completed = !m.tasks[m.cursor].Completed
		//	_ = storage.Save(&m.tasks)
		//}
	}

	return m, nil
}

func (m Model) View() string {
	s := "📝 GoDo - To Do List\n\n"

	if m.mode == browseMode {
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

	} else if m.mode == addMode {
		s += "Add New Task: \n\n"
		s += m.inputText
		s += "\n\nEnter = save • Esc = cancel\n"
	}

	return s
}
