package main

import (
	"Event-Nexus-Api/routes/serviceRoutes"
	"fmt"

	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func main() {
	app := fiber.New()
	fmt.Println("Hello World")
	godotenv.Load(".env")
	dbhost := os.Getenv("MYSQL_HOST")
	dbuser := os.Getenv("MYSQL_USER")
	dbpass := os.Getenv("MYSQL_PASSWORD")
	dbname := os.Getenv("MYSQL_DATABASE")
	connection := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbuser, dbpass, dbhost, dbname)
	db, err := gorm.Open(mysql.Open(connection), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	DB = db
	fmt.Println("Database connected")

	//Routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	//Service Routes
	app.Post("/service", serviceRoutes.CreateService)

	app.Listen(":3000")
}
