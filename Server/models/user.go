package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserID            uint16 `gorm:"primaryKey;uniqueIndex" json:"user_id"`
	FirebaseUID       string `gorm:"type:varchar(100);not null;uniqueIndex" json:"firebase_uid" valid:"required~Firebase UID is required"`
	Name              string `gorm:"type:varchar(100);not null;" json:"name" valid:"required~Name is required,matches(^[a-zA-Z ]+$)~Name must be alphabetic"`
	Email             string `gorm:"type:varchar(100);not null;uniqueIndex" json:"email" valid:"required~Email is required,email~Email is not valid"`
	ProfilePictureURL string `gorm:"type:text" json:"profile_picture_url" valid:"url~URL is not valid"`
	ContactNumber     string `gorm:"type:varchar(20);not null" json:"contact_number" valid:"required~Contact number is required,numeric~Contact number must be numeric"`
	Gender            string `gorm:"type:varchar(10)" json:"gender" valid:"in(male|female|other)~Gender must be male female or other"`
	//Username          string `gorm:"not null;uniqueIndex" json:"username"`
	//Email             string    `gorm:"not null;uniqueIndex" json:"email"`
	//PhoneNumber       string    `gorm:"not null;uniqueIndex" json:"phone_number"`
	//RegisteredService []Service `gorm:"foreignKey:ServiceID" json:"registered_service"`
}
