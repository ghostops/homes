package controllers

import (
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
	var lat32 float32
	var lng32 float32

	lat64, _ := strconv.ParseFloat(c.PostForm("lat"), 32)
	lng64, _ := strconv.ParseFloat(c.PostForm("lng"), 32)

	lat32 = float32(lat64)
	lng32 = float32(lng64)

	home := &models.Home{
		Images:   nil,
		Lat:      lat32,
		Lng:      lng32,
		MovedIn:  time.Now(),
		MovedOut: time.Now(),
		Name:     c.PostForm("name"),
	}

	result := database.Database.Create(home)

	if result.Error != nil {
		panic("duhhhh")
	}

	c.JSON(200, home)
}
