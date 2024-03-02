package serviceRoutes

import (
	database "Event-Nexus-Api/Database"
	"Event-Nexus-Api/models"
	"github.com/gofiber/fiber/v2"
	"log"
)

// // CreateService creates a new service in the database
//
//	func CreateService(db *sql.DB, name string) (*Service, error) {
//		// Validate input
//		if name == "" {
//			return nil, errors.New("name cannot be empty")
//		}
//
//		// Insert the service into the database
//		query := "INSERT INTO services (name) VALUES ($1) RETURNING id"
//		var id int
//		err := db.QueryRow(query, name).Scan(&id)
//		if err != nil {
//			log.Println("Failed to create service:", err)
//			return nil, err
//		}
//
//		// Create the service object
//		service := &Service{
//			ID:   id,
//			Name: name,
//		}
//
//		return service, nil
//	}
func CreateService(c *fiber.Ctx) error {
	var service models.Service

	// parsing the request body into the service struct
	err := c.BodyParser(&service)
	if err != nil {
		log.Printf("Error parsing request body: %v\n", err)
	}

	//Validating the Service struct
	//will add after I create validators

	//checking if service exists
	existingService := models.Service{}
	if database.Database.Db.Where("service_id = ?", service.ServiceID).First(&existingService).Error == nil {
		log.Println("Service already exists")
		return c.Status(400).SendString("Service already exists")
	}
	result := database.Database.Db.Create(&service)
	if result.Error != nil {
		log.Printf("Error creating booking: %v\n", result.Error)
		return c.Status(500).SendString("Error creating booking")
	}

	return c.SendString("Created Service")
}
