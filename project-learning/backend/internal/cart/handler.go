package cart

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

type AddRequest struct {
	ProductId uint `json:"productId"`
	Quantity  uint `json:"quantity"`
}

func (h *Handler) Add(c *gin.Context) {
	userId := c.GetUint("user_id")

	var req AddRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	h.service.Add(userId, req.ProductId, req.Quantity)
	c.JSON(http.StatusOK, gin.H{"message": "added to cart"})
}

func (h *Handler) List(c *gin.Context) {
	userId := c.GetUint("user_id")
	items, _ := h.service.List(userId)
	c.JSON(http.StatusOK, items)
}
