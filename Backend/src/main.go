package main

import (
	"log"

	"github.com/joho/godotenv"

	"github.com/ghostops/home/src/database"
	"github.com/ghostops/home/src/router"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Print("[WARNING] Error loading .env file, fallback to OS env!")
	}

	// Start the database connection
	database.ConnectDb()

	// Close the database connection on defer
	defer database.Database.Close()

	router.CreateURLMappings()
	router.Router.Run(":8080")
}
