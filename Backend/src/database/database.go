package database

import (
	"fmt"
	"log"
	"os"

	"github.com/ghostops/home/src/models"

	"github.com/jinzhu/gorm"

	// Implicit for import for gorm
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// Database is the main DB connection
var Database *gorm.DB

// ConnectDb _
func ConnectDb() {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	database := os.Getenv("DB_DATABASE")

	connection := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=true", user, password, host, port, database)

	db, err := gorm.Open("mysql", connection)

	if err != nil {
		log.Println(err)
		log.Fatal(connection)
	}

	// Migrate the schema
	db.AutoMigrate(&models.Home{})

	// Set the global Database
	Database = db
}
