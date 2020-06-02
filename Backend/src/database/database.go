package database

import (
	"github.com/ghostops/home/src/models"

	"github.com/jinzhu/gorm"

	// Implicit for import for gorm
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// Database is the main DB connection
var Database *gorm.DB

// ConnectDb _
func ConnectDb() {
	db, err := gorm.Open("mysql", "home:home@tcp(db:3306)/home?charset=utf8&parseTime=true")

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&models.Home{})

	// Set the global Database
	Database = db
}
