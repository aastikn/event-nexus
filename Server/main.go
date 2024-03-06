package main

import (
	database "Event-Nexus-Api/Database"
	"Event-Nexus-Api/routes/serviceRoutes"
	UserRoutes "Event-Nexus-Api/routes/userRoutes"
	"log"

	"github.com/gofiber/fiber/v2"
)

//var DB *gorm.DB

func main() {
	app := fiber.New()
	//abc
	//abc
	//fmt.Println("Hello World")
	//godotenv.Load(".env")
	//dbhost := os.Getenv("PSQL_HOST")
	//dbuser := os.Getenv("PSQL_USER")
	//dbpass := os.Getenv("PSQL_PASSWORD")
	//dbname := os.Getenv("PSQL_DBNAME")
	//connection := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbuser, dbpass, dbhost, dbname)
	//db, err := gorm.Open(postgres.Open(connection), &gorm.Config{})
	//
	//if err != nil {
	//	panic("failed to connect database")
	//}
	//DB = db
	//fmt.Println("Database connected")
	database.ConnectToDB()
	//Routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	//Service Routes
	app.Post("/service", serviceRoutes.CreateService)
	app.Get("/service/:id", serviceRoutes.GetService)
	app.Delete("/service/:id", serviceRoutes.DeleteService)

	//User Routes
	app.Post("/user", UserRoutes.CreateUser)

	log.Fatal(app.Listen(":3000"))
}
