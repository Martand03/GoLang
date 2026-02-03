package main

import (
	"errors"
	"fmt"
	"log"
)

/*
The var keyword is used to declare global variables (outside the function).

The := syntax (short declaration) can only be used within a function, like main().

idomatic := means declare and assign
*/

var age int = 25
var name string = "Martand"

func add(a int, b int) int {
	return a + b
}

// multiple return values

func divide(a int, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}

	return a / b, nil
}

// struct classes without boilerplate

type User struct {
	ID    int64
	Email string
}

//methods

func (u User) IsAdmin() bool {
	return true
}

// interface

type PaymentService interface {
	Pay() error
}

func save() error {
	return errors.New("Error while saving")
}

func errorHandling() {

	err := save()
	if err != nil {
		log.Println(err)
	}
}

func mainBasics() {

	age := 25
	email := "xyz@gmail.com"

	// creating instance
	u := User{
		ID:    1,
		Email: "abc@yopmail.com",
	}

	fmt.Println(u)
	fmt.Println(age, email)
	fmt.Printf("Age: %d, Email: %s\n", age, email)
}
