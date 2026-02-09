package main

import "fmt"

func main() {
	fmt.Println("Hello, Go!")

	//learnIf()
	//
	//learnFor()
	//
	//learnWhileEq()
	//
	//learnSwitch()
	//
	//fmt.Println("Adding 2 numbers: ", adding(1, 9))
	//
	//fmt.Println("Dividing 2 numbers: ")
	//result, err := dividing(2, 0)
	//if err != nil {
	//	fmt.Println("Error:", err)
	//	return
	//}
	//fmt.Println("Result: ", result)

	nonPrim()

	//mainBasics()
	//
	//productDetails()
}

var a int = 32
var b float64 = 10.32
var c string = "Hello"
var d bool = true

//x := 10
//y := "string"

func learnIf() {
	x := 10

	if x > 10 {
		fmt.Println("big")
	} else {
		fmt.Println("small")
	}
}

func learnFor() {
	fmt.Println("Starting for")
	x := 5
	for i := 0; i < x; i++ {
		fmt.Println(i)
	}
	fmt.Println("Ending for")
}

func learnWhileEq() {
	fmt.Println("Starting while")
	x := 2
	for x < 10 {
		fmt.Println(x)
		x++
	}
	fmt.Println("Ending while")
}

func learnSwitch() {
	fmt.Println("Starting switch")

	day := 1
	switch day {
	case 1:
		fmt.Println("Case 1")
	case 2:
		fmt.Println("Case 2")
	default:
		fmt.Println("Case default")

	}
}
func adding(a, b int) int {
	return a + b
}

func dividing(a, b int) (int, error) {
	if b == 0 {
		return 0, fmt.Errorf("Cannot divide by zero")
	}

	return a / b, nil
}

func nonPrim() {
	//array
	nums := []int{1, 2, 3}
	nums = append(nums, 4)
	fmt.Println(nums)
	fmt.Println(nums[0])

	//map
	m := make(map[string]int)
	m["a"] = 1
	value, ok := m["a"]
	fmt.Println(value, ok)
}
