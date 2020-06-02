package main

import (
	"github.com/ghostops/home/src/database"
	"github.com/ghostops/home/src/router"
)

func main() {
	// Start the database connection
	database.ConnectDb()

	// Close the database connection on defer
	defer database.Database.Close()

	router.CreateURLMappings()
	router.Router.Run(":8080")
}
