package lib

import (
	"bytes"
	"errors"
	"fmt"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"

	"github.com/google/uuid"
)

// AwsSession is an open AWS session
var AwsSession *session.Session

// StartAwsSession starts a new AWS session and stores it on AwsSession
func StartAwsSession() {
	sess, err := session.NewSession()

	if err != nil {
		log.Fatal(err)
		return
	}

	AwsSession = sess
}

// ListObjects lists objects on a specified key
func ListObjects(key string) (*s3.ListObjectsOutput, error) {
	svc := s3.New(AwsSession)

	input := &s3.ListObjectsInput{
		Bucket: aws.String(os.Getenv("S3_BUCKET_NAME")),
		Prefix: aws.String(key),
	}

	result, err := svc.ListObjects(input)

	return result, err
}

// UploadImageToS3 uploads a single image to S3
func UploadImageToS3(header *multipart.FileHeader, homeID string) (*s3.PutObjectInput, error) {
	file, err := header.Open()

	if err != nil {
		return nil, err
	}

	defer file.Close()

	svc := s3.New(AwsSession)

	size := header.Size
	buffer := make([]byte, size)

	file.Read(buffer)
	fileBytes := bytes.NewReader(buffer)
	fileType := http.DetectContentType(buffer)

	if fileType != "image/png" && fileType != "image/jpg" && fileType != "image/jpeg" {
		return nil, errors.New("invalid filetype " + fileType)
	}

	split := strings.Split(fileType, "/")
	fileEnding := split[len(split)-1]

	fileID := uuid.New()

	s3Key := fmt.Sprintf("%s/%s/%s.%s", os.Getenv("S3_IMAGE_PATH"), homeID, fileID.String(), fileEnding)

	params := &s3.PutObjectInput{
		Bucket:        aws.String(os.Getenv("S3_BUCKET_NAME")),
		Key:           aws.String(s3Key),
		ACL:           aws.String("public-read"),
		Body:          fileBytes,
		ContentLength: aws.Int64(size),
		ContentType:   aws.String(fileType),
	}

	_, err = svc.PutObject(params)

	return params, err
}
