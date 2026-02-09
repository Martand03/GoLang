package main

import (
	"time"

	"github.com/MartandMahajan/project-learning/backend/auth"
	"github.com/MartandMahajan/project-learning/backend/internal/cart"
	"github.com/MartandMahajan/project-learning/backend/internal/config"
	"github.com/MartandMahajan/project-learning/backend/internal/order"
	"github.com/MartandMahajan/project-learning/backend/internal/product"
	"github.com/MartandMahajan/project-learning/backend/internal/user"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	db := config.ConnectDB()
	db.AutoMigrate(&user.User{})

	userRepo := user.NewRepository(db)
	userService := user.NewService(userRepo)
	userHandler := user.NewHandler(userService)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/api/auth/signup", userHandler.SignUp)
	r.POST("/api/auth/login", userHandler.Login)

	// products wiring
	productRepo := product.NewRepository(db)
	productService := product.NewService(productRepo)
	productHandler := product.NewHandler(productService)
	db.AutoMigrate(&product.Product{})

	// carts wiring
	cartRepo := cart.NewRepository(db)
	cartService := cart.NewService(cartRepo)
	cartHandler := cart.NewHandler(cartService)
	db.AutoMigrate(&cart.CartItem{})

	// orders wiring
	orderService := order.NewService(db)
	orderHandler := order.NewHandler(orderService)
	db.AutoMigrate(&order.Order{}, &order.OrderItem{})

	authGroup := r.Group("/api")
	authGroup.Use(auth.AuthMiddleWare())
	{
		authGroup.GET("/profile", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"user_id": c.GetString("user_id"),
				"role":    c.GetString("role"),
			})
		})

		authGroup.GET("/products", productHandler.List)
		authGroup.POST("/cart", cartHandler.Add)
		authGroup.GET("/cart", cartHandler.List)
		authGroup.POST("/orders", orderHandler.PlaceOrder)

		admin := authGroup.Group("/admin")
		admin.Use(auth.AdminOnly())
		{
			admin.POST("/products", productHandler.Create)
		}
	}

	r.Run(":8089")
}
