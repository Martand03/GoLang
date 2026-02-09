package order

import (
	"errors"

	"github.com/MartandMahajan/project-learning/backend/internal/cart"
	"github.com/MartandMahajan/project-learning/backend/internal/product"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Service struct {
	db *gorm.DB
}

func NewService(db *gorm.DB) *Service {
	return &Service{db: db}
}

func (s *Service) PlaceOrder(userId uint) error {
	return s.db.Transaction(func(tx *gorm.DB) error {

		var cartItems []cart.CartItem
		if err := tx.Where("user_id = ?", userId).Find(&cartItems).Error; err != nil {
			return err
		}

		if len(cartItems) == 0 {
			return errors.New("cart is empty")
		}

		order := Order{
			UserId: userId,
			Status: "CREATED",
		}

		if err := tx.Create(&order).Error; err != nil {
			return err
		}

		for _, item := range cartItems {
			var prod product.Product

			if err := tx.
				Clauses(clause.Locking{Strength: "UPDATE"}).
				First(&prod, item.ProductId).Error; err != nil {
				return err
			}

			if prod.Stock < item.Quantity {
				return errors.New("insufficient stock")
			}

			prod.Stock -= item.Quantity
			if err := tx.Save(&prod).Error; err != nil {
				return err
			}

			orderItem := OrderItem{
				OrderId:   order.ID,
				ProductId: item.ProductId,
				Quantity:  item.Quantity,
				Price:     prod.Price,
			}

			if err := tx.Create(&orderItem).Error; err != nil {
				return err
			}
		}
		
		if err := tx.Where("user_id = ?", userId).Delete(&cart.CartItem{}).Error; err != nil {
			return err
		}

		return nil
	})
}
