package serviceRoutes

import (
	database "Event-Nexus-Api/Database"
	"fmt"
	"log"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func DeleteService(c *fiber.Ctx) error {

	serviceId, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		log.Printf("Error converting service id to int: %v \n", err)
		return c.Status(400).SendString("invalid service Id")
	}

	result := database.Database.Db.Exec("DELETE FROM services WHERE id = $1", serviceId)
	if result.Error != nil {
		log.Printf("Error deleting service: %v\n", err)
		return c.Status(500).SendString("Error deleting service")
	}

	if result.RowsAffected == 0 {
		return c.Status(404).SendString("Service not found")
	}

	responseMessage := fmt.Sprintf("Service with id %d deleted", serviceId)
	log.Println(responseMessage)

	return c.Status(200).SendString(responseMessage)
}
