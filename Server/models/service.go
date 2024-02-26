package models

import (
	"gorm.io/gorm"
	"Time"
)

type Service struct {
	gorm.Model
	ServiceID     uint16    `json:"service_id"`
	BeginningDate Time.time `json:"beginning_date"`
	EndDate       Time.time `json:"end_date"`
	CostPrice     uint16    `json:"cost_price"`
}
