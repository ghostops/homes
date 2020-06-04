package lib

import (
	"fmt"
	"os"
	"strconv"
	"time"
	"unicode/utf8"

	"github.com/gin-gonic/gin"
	"github.com/nleeper/goment"
)

// CoordToFloat32 converts a string coord to a float32
func CoordToFloat32(coord string) float32 {
	var coord32 float32

	coord64, _ := strconv.ParseFloat(coord, 32)

	coord32 = float32(coord64)

	return coord32
}

// DateStrToTime converts a date string to Go Time
func DateStrToTime(datestr string) time.Time {
	var date *goment.Goment

	parsed, err := goment.New(datestr)

	// If we have an error parsing the date we just use NOW
	if err != nil || parsed.ToString() == "0000-00-00" {
		now, _ := goment.New()
		date = now
	} else {
		date = parsed
	}

	return date.ToTime()
}

// HandleErrorJSON handles error responses
func HandleErrorJSON(c *gin.Context, err string) {
	c.JSON(500, gin.H{
		"error": err,
	})
}

// RemoveFirstLetter removes the first rune of a string
func RemoveFirstLetter(s string) string {
	_, i := utf8.DecodeRuneInString(s)
	return s[i:]
}

// CreateS3Path combines S3 values to a URL of an object
func CreateS3Path(key string) string {
	// if first rune is /
	isSlash := key[0] == 47

	extraSlash := "/"

	if isSlash {
		extraSlash = ""
	}

	url := fmt.Sprintf("https://%s.s3.%s.amazonaws.com%s%s", os.Getenv("S3_BUCKET_NAME"), os.Getenv("AWS_REGION"), extraSlash, key)

	return url
}
