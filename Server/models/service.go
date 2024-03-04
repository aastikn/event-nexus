package models

import (
	"gorm.io/gorm"
	"time"
)

type Service struct {
	gorm.Model
	ServiceID     uint16    `gorm:"primaryKey;uniqueIndex" json:"service_id"`
	BeginningDate time.Time `gorm:"not null" json:"beginning_date"`
	EndDate       time.Time `gorm:"not null" json:"end_date"`
	CostPrice     uint16    `gorm:"not null" json:"cost_price"`
}
