package UserRoutes

import (
	database "Event-Nexus-Api/Database"
	"Event-Nexus-Api/models"

	"github.com/gofiber/fiber/v2"
)

// CreateUser handles the POST request to create a user
func CreateUser(c *fiber.Ctx) error {
	user := new(models.User)

	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	//checking if the user exists
	existingUser := models.User{}
	if database.Database.Db.Where("user_id = ?", user.UserID).First(&existingUser).Error == nil {
		return c.Status(400).SendString("User already exists")
	}

	result := database.Database.Db.Create(&user)
	if result.Error != nil {
		return c.Status(500).SendString("Error creating user")
	}

	// Here you can add the user to your database
	// For this example, we're just returning the user data

	return c.Status(fiber.StatusCreated).JSON(user)
}
