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

	// // Create
	// db.Create(&Product{Code: "L1212", Price: 1000})

	// // Read
	// var product Product
	// db.First(&product, 1)                   // find product with id 1
	// db.First(&product, "code = ?", "L1212") // find product with code l1212

	// // Update - update product's price to 2000
	// db.Model(&product).Update("Price", 2000)

	// // Delete - delete product
	// db.Delete(&product)

	Database = db
}
