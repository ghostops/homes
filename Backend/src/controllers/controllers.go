package controllers

import (
	"github.com/gin-gonic/gin"
)

// Cors enables CORS requests
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
		c.Next()
	}
}
