package controllers

import (
	"log"
	"strconv"
	"time"

	"github.com/ghostops/home/src/database"
	"github.com/ghostops/home/src/models"
	"github.com/gin-gonic/gin"
)

// GetAllHomes gets all homes
func GetAllHomes(c *gin.Context) {
	var records []models.Home
	result := database.Database.Find(&records)

	if result.Error != nil {
		panic("duhhhh")
	}

	c.JSON(200, result.Value)
}

// GetHome gets a home
func GetHome(c *gin.Context) {
	c.JSON(200, gin.H{"swag": "yolo"})
}

// CreateHome creates a new home
func CreateHome(c *gin.Context) {
	completed, _ := strconv.Atoi(c.PostForm("completed"))
	log.Println(completed)

	home := &models.Home{
		Images:   nil,
		Lat:      0,
		Lng:      0,
		MovedIn:  time.Now(),
		MovedOut: time.Now(),
		Name:     "Basement",
	}

	result := database.Database.Create(home)

	if result.Error != nil {
		panic("duhhhh")
	}

	c.JSON(200, home)
}
