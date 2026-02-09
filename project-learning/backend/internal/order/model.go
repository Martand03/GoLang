package order

import "time"

type Order struct {
	ID        uint `gorm:"primaryKey"`
	UserId    uint
	Status    string
	CreatedAt time.Time
}

type OrderItem struct {
	ID        uint `gorm:"primaryKey"`
	OrderId   uint
	ProductId uint
	Quantity  uint
	Price     float64
}
