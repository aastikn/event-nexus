package models

import (
	"gorm.io/gorm"
	"time"
)

type Service struct {
	gorm.Model
	ServiceID     uint16    `json:"service_id"`
	BeginningDate time.Time `json:"beginning_date"`
	EndDate       time.Time `json:"end_date"`
	CostPrice     uint16    `json:"cost_price"`
}
