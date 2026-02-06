package cart

type CartItem struct {
	ID        uint `gorm:"primaryKey"`
	UserId    uint `gorm:"index"`
	ProductId uint
	Quantity  uint
}
