package controllers

import (
	"github.com/gin-gonic/gin"
)

// Authentication allows the frontend to make a test call to see if your credentials are correct
func Authentication(c *gin.Context) {
	c.String(200, "ok")
}
