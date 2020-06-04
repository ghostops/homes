package controllers

import (
	"github.com/ghostops/home/src/lib"
	"github.com/gin-gonic/gin"
)

// GetImagesForHome gets all images for a home ID
func GetImagesForHome(c *gin.Context) {
	homeID := c.Param("id")
	s3Path := lib.CreateS3PathString(homeID)
	contents, err := lib.ListObjects(s3Path)

	if err != nil {
		c.JSON(200, gin.H{"error": err.Error()})
		return
	}

	images := lib.S3ToUrls(contents)

	c.JSON(200, gin.H{
		"Images": images,
	})
}

// UploadImageForHome uplaods an image for a home based on ID
func UploadImageForHome(c *gin.Context) {
	_, header, err := c.Request.FormFile("file")
	id := c.Param("id")

	if err != nil {
		c.JSON(200, gin.H{"error": err.Error()})
		return
	}

	params, err := lib.UploadImageToS3(header, id)

	if err != nil {
		c.JSON(200, gin.H{"error": err.Error()})
		return
	}

	path := lib.CreateS3Path(*params.Key)

	c.JSON(200, gin.H{
		"Path": path,
	})
}
