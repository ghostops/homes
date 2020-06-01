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
	Images   []HomeImage
	Lat      float32
	Lng      float32
}

// HomeImage stores data related to pictures of your home
type HomeImage struct {
	gorm.Model
	HomeID      uint
	Description string `gorm:"size:500"`
	Path        string `gorm:"size:255"`
}
