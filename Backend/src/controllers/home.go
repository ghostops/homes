package controllers

import (
	"fmt"
	"strconv"
	"time"

	"github.com/ghostops/home/src/database"
	"github.com/ghostops/home/src/enrich"
	"github.com/ghostops/home/src/lib"
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

	enrichedHomes := []enrich.HomeEnriched{}

	for _, home := range homes {
		e := enrich.Home(home, false)
		enrichedHomes = append(enrichedHomes, e)
	}

	c.JSON(200, enrichedHomes)
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

	e := enrich.Home(*home, true)

	c.JSON(200, e)
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

	e := enrich.Home(*home, true)

	c.JSON(200, e)
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

	e := enrich.Home(home, true)

	c.JSON(200, e)
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

	// Delete the images
	s3Path := lib.CreateS3PathString(fmt.Sprint(home.ID))
	contents, _ := lib.ListObjects(s3Path)
	for _, object := range contents.Contents {
		lib.DeleteObject(*object.Key)
	}

	e := enrich.Home(home, false)

	c.JSON(200, e)
}
