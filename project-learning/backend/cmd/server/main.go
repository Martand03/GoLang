package main

import (
	"time"

	"github.com/MartandMahajan/project-learning/backend/internal/config"
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
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/api/auth/signup", userHandler.SignUp)
	r.POST("/api/auth/login", userHandler.Login)

	r.Run(":8089")
}
