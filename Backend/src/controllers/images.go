package controllers

import (
	"os"

	"github.com/ghostops/home/src/lib"
	"github.com/gin-gonic/gin"
)

// GetImagesForHome gets all images for a home ID
func GetImagesForHome(c *gin.Context) {
	homeID := c.Param("id")
	s3Path := lib.RemoveFirstLetter(os.Getenv("S3_IMAGE_PATH"))
	contents, err := lib.ListObjects(s3Path + "/" + homeID + "/")

	if err != nil {
		c.JSON(200, gin.H{"error": err.Error()})
		return
	}

	files := []string{}

	for index := range contents.Contents {
		path := lib.CreateS3Path(*contents.Contents[index].Key)
		files = append(files, path)
	}

	c.JSON(200, gin.H{
		"Images": files,
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
