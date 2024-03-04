package models

import "gorm.io/gorm"

type Provider struct {
	gorm.Model
	ProviderID  uint16 `gorm:"primaryKey;uniqueIndex" json:"provider_id"`
	Name        string `gorm:"not null" json:"name"`
	email       string `gorm:"not null;uniqueIndex" json:"email"`
	PhoneNumber string `gorm:"not null;uniqueIndex" json:"phone_number"`
	//ServicesProvided []Service.Ser `gorm:"foreignKey:ServiceID;references:ID" json:"services_provided"`
	ServiceCategory string `gorm:"not null" json:"service_category"`
}
