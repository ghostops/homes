package main

import (
	"github.com/ghostops/home/src/database"
	"github.com/ghostops/home/src/router"
)

func main() {
	database.ConnectDb()

	router.CreateURLMappings()
	router.Router.Run(":8080")
}
