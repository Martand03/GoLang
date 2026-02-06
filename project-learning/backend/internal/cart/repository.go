package cart

import "gorm.io/gorm"

type Repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Add(userId, productId, qty uint) error {
	var item CartItem
	err := r.db.Where("user_id = ? AND product_id = ?", userId, productId).First(&item).Error

	if err == nil {
		item.Quantity += qty
		return r.db.Save(&item).Error
	}

	item = CartItem{
		UserId:    userId,
		ProductId: productId,
		Quantity:  qty,
	}

	return r.db.Create(&item).Error
}

func (r *Repository) List(userId uint) ([]CartItem, error) {
	var items []CartItem
	err := r.db.Where("user_id = ?", userId).Find(&items).Error
	return items, err
}
