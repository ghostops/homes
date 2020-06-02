package controllers

import (
	"strconv"
	"time"

	"github.com/ghostops/home/src/database"
	"github.com/ghostops/home/src/lib"
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

// GetHome gets a home based on ID
func GetHome(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	result := database.Database.First(&models.Home{}, id)

	if result.Error != nil {
		lib.HandleErrorJSON(c, result.Error.Error())
		return
	}

	var home *models.Home = result.Value.(*models.Home)

	c.JSON(200, home)
}

// CreateHome creates a new home
func CreateHome(c *gin.Context) {
	lat32 := lib.CoordToFloat32(c.PostForm("lat"))
	lng32 := lib.CoordToFloat32(c.PostForm("lng"))

	movedIn := lib.DateStrToTime(c.PostForm("movedIn"))
	movedOut := lib.DateStrToTime(c.PostForm("movedOut"))

	imageJSON := c.PostForm("images")

	home := &models.Home{
		Images:   imageJSON,
		Lat:      lat32,
		Lng:      lng32,
		MovedIn:  movedIn,
		MovedOut: movedOut,
		Name:     c.PostForm("name"),
	}

	result := database.Database.Create(home)

	if result.Error != nil {
		lib.HandleErrorJSON(c, result.Error.Error())
		return
	}

	c.JSON(200, home)
}

// UpdateHome updated a home based on ID
func UpdateHome(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	lat32 := lib.CoordToFloat32(c.PostForm("lat"))
	lng32 := lib.CoordToFloat32(c.PostForm("lng"))

	movedIn := lib.DateStrToTime(c.PostForm("movedIn"))
	movedOut := lib.DateStrToTime(c.PostForm("movedOut"))

	imageJSON := c.PostForm("images")

	var home models.Home

	database.Database.First(&home, id)

	database.Database.Model(&home).Updates(models.Home{
		Images:   imageJSON,
		Lat:      lat32,
		Lng:      lng32,
		MovedIn:  movedIn,
		MovedOut: movedOut,
		Name:     c.PostForm("name"),
	})

	c.JSON(200, home)
}

// DeleteHome deletes a home based on ID
func DeleteHome(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	var home models.Home

	result := database.Database.First(&home, id)

	if result.Error != nil {
		lib.HandleErrorJSON(c, result.Error.Error())
		return
	}

	database.Database.Delete(&home)

	now := time.Now()
	home.DeletedAt = &now

	c.JSON(200, home)
}
