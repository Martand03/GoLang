package storage

import (
	"encoding/json"
	"os"
)

const filePath = "data/task.json"

func Save(tasks interface{}) error {
	data, err := json.MarshalIndent(tasks, "", " ")
	if err != nil {
		return err
	}

	return os.WriteFile(filePath, data, 0644)
}

func Load(target interface{}) error {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}

	return json.Unmarshal(data, target)
}
