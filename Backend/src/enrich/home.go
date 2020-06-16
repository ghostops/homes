package enrich

import (
	"fmt"
	"time"

	"github.com/ghostops/home/src/lib"
	"github.com/ghostops/home/src/models"
)

// HomeEnriched enriches the Home DB Struct
type HomeEnriched struct {
	ID       uint
	MovedIn  time.Time
	MovedOut time.Time
	Name     string `gorm:"size:255"`
	Lat      float32
	Lng      float32
	Images   []string
}

// Home executes the enrichment of Home
func Home(home models.Home, includeImages bool) HomeEnriched {
	images := []string{}

	if includeImages {
		homeID := fmt.Sprintf("%d", home.ID)
		s3Path := lib.CreateS3PathString(homeID)
		contents, _ := lib.ListObjects(s3Path)
		images = lib.S3ToUrls(contents)
	}

	return HomeEnriched{
		ID:       home.ID,
		Name:     home.Name,
		MovedIn:  home.MovedIn,
		MovedOut: home.MovedOut,
		Lat:      home.Lat,
		Lng:      home.Lng,
		Images:   images,
	}
}
