package UserRoutes

import (
	"github.com/gofiber/fiber/v2"
)

// CreateUser handles the POST request to create a user
func CreateUser(c *fiber.Ctx) error {
	user := new(User)

	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Here you can add the user to your database
	// For this example, we're just returning the user data

	return c.Status(fiber.StatusCreated).JSON(user)
}

