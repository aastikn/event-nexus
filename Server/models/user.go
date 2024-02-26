package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserID            uint16    `json:"user_id"`
	Username          string    `json:"username"`
	Email             string    `json:"email"`
	PhoneNumber       string    `json:"phone_number"`
	RegisteredService []Service `json:"registered_service"`
}
