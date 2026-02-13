package ui

import "github.com/charmbracelet/lipgloss"

var (
	titleStyle = lipgloss.NewStyle().
		Bold(true).
		Foreground(lipgloss.Color("205"))

	cursorStyle = lipgloss.NewStyle().
		Foreground(lipgloss.Color("212"))

	completedStyle = lipgloss.NewStyle().
		Foreground(lipgloss.Color("240")).
		Strikethrough(true)

	pendingStyle = lipgloss.NewStyle().
		Foreground(lipgloss.Color("255"))

	helpStyle = lipgloss.NewStyle().
		Foreground(lipgloss.Color("241"))

	inputStyle = lipgloss.NewStyle().
		Foreground(lipgloss.Color("229")).
		Background(lipgloss.Color("57")).
		Padding(0, 1)

	boxStyle = lipgloss.NewStyle().
		Border(lipgloss.RoundedBorder()).
		Padding(1, 2)
)
