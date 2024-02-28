package models

import "gorm.io/gorm"

type Models struct {
	gorm.Model
	ProviderID       uint16    `json:"provider_id"`
	Name             string    `json:"name"`
	email            string    `json:"email"`
	PhoneNumber      string    `json:"phone_number"`
	ServicesProvided []Service `json:"services_provided"`
	ServiceCategory  string    `json:"service_category"`
}
