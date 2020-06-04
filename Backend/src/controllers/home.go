package controllers

import (
	"strconv"
	"time"

	"github.com/ghostops/home/src/database"
	"github.com/ghostops/home/src/lib"
	"github.com/ghostops/home/src/marshal"
	"github.com/ghostops/home/src/models"

	"github.com/gin-gonic/gin"
)

// GetAllHomes gets all homes
func GetAllHomes(c *gin.Context) {
	var homes []models.Home

	result := database.Database.Find(&homes)

	if result.Error != nil {
		lib.HandleErrorJSON(c, result.Error.Error())
		return
	}

	var marshaledHomes []marshal.HomeMarshal

	for _, home := range homes {
		m := marshal.Home(home)
		marshaledHomes = append(marshaledHomes, m)
	}

	c.JSON(200, marshaledHomes)
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

	marshaled := marshal.Home(*home)

	c.JSON(200, marshaled)
}

// CreateHome creates a new home
func CreateHome(c *gin.Context) {
	lat32 := lib.CoordToFloat32(c.PostForm("lat"))
	lng32 := lib.CoordToFloat32(c.PostForm("lng"))

	movedIn := lib.DateStrToTime(c.PostForm("movedIn"))
	movedOut := lib.DateStrToTime(c.PostForm("movedOut"))

	home := &models.Home{
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

	marshaled := marshal.Home(*home)

	c.JSON(200, marshaled)
}

// UpdateHome updated a home based on ID
func UpdateHome(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	var home models.Home

	result := database.Database.First(&home, id)

	if result.Error != nil {
		lib.HandleErrorJSON(c, result.Error.Error())
		return
	}

	lat32 := lib.CoordToFloat32(c.PostForm("lat"))
	lng32 := lib.CoordToFloat32(c.PostForm("lng"))

	movedIn := lib.DateStrToTime(c.PostForm("movedIn"))
	movedOut := lib.DateStrToTime(c.PostForm("movedOut"))

	database.Database.Model(&home).Updates(models.Home{
		Lat:      lat32,
		Lng:      lng32,
		MovedIn:  movedIn,
		MovedOut: movedOut,
		Name:     c.PostForm("name"),
	})

	marshaled := marshal.Home(home)

	c.JSON(200, marshaled)
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

	marshaled := marshal.Home(home)

	c.JSON(200, marshaled)
}
