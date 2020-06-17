package router

import (
	"github.com/ghostops/home/src/controllers"
	// "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Router is the global router object
var Router *gin.Engine

// CreateURLMappings creates the router for Gin
func CreateURLMappings() {
	Router = gin.Default()

	// config := cors.DefaultConfig()
	// config.AllowOrigins = []string{"*"}

	// Router.Use(cors.New(config))

	// v1 of the API
	v1 := Router.Group("/v1")
	{
		v1.GET("/homes", controllers.GetAllHomes)
		v1.GET("/homes/:id", controllers.GetHome)
		v1.POST("/homes", controllers.CreateHome)
		v1.PUT("/homes/:id", controllers.UpdateHome)
		v1.DELETE("/homes/:id", controllers.DeleteHome)

		v1.GET("/images/home/:id", controllers.GetImagesForHome)
		v1.POST("/images/home/:id", controllers.UploadImageForHome)
	}
}
