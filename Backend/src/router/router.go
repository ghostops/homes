package router

import (
	"github.com/ghostops/home/src/controllers"
	"github.com/gin-gonic/gin"
)

// Router is the global router object
var Router *gin.Engine

// CreateURLMappings creates the router for Gin
func CreateURLMappings() {
	Router = gin.Default()
	Router.Use(controllers.Cors())
	// v1 of the API
	v1 := Router.Group("/v1")
	{
		v1.GET("/homes", controllers.GetAllHomes)
		v1.GET("/homes/:id", controllers.GetHome)
		v1.POST("/homes", controllers.CreateHome)
		v1.PUT("/homes/:id", controllers.UpdateHome)
		v1.DELETE("/homes/:id", controllers.DeleteHome)
	}
}
