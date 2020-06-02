package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

// Home stores all data related to a home
type Home struct {
	gorm.Model
	MovedIn  time.Time
	MovedOut time.Time
	Name     string `gorm:"size:255"`
	Images   string `sql:"type:text;"`
	Lat      float32
	Lng      float32
}
