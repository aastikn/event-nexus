package serviceRoutes

import (
	database "Event-Nexus-Api/Database"
	"Event-Nexus-Api/models"
	"github.com/gofiber/fiber/v2"
	"log"
	"strconv"
)

func GetService(c *fiber.Ctx) error {
	ServiceID, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		log.Printf("Error converting service id to int: %v \n", err)
		return c.Status(400).SendString("invalid Service Id")
	}

	//fetch service details
	var service models.Service
	if err := database.Database.Db.Where("id=?", ServiceID).First(&service).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Failed to fetch host user details"})
	}

	//creating response format
	serviceDetails := fiber.Map{
		"service_id":     service.ServiceID,
		"beginning_date": service.BeginningDate,
		"end_date":       service.EndDate,
		"cost_price":     service.CostPrice,
	}
	return c.Status(fiber.StatusOK).JSON(serviceDetails)
}
