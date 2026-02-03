package main

import "fmt"

type Product struct {
	ID    int64
	Name  string
	Price float64
}

func (p Product) DiscountedPrice(discount float64) float64 {
	return p.Price - (p.Price*discount)/100
}

func productDetails() {
	p := Product{
		ID:    12,
		Name:  "Laptop",
		Price: 50000,
	}

	fmt.Println("Original: ", p.Price)
	fmt.Println("After Discount: ", p.DiscountedPrice(10))
}
