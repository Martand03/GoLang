package model

type Task struct {
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}
