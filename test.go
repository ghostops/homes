package main

import (
	"fmt"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sts"
)

func main() {
	// create a session
	sess, _ := session.NewSession()
	// create a service client
	stsClient := sts.New(sess)
	// create a request
	request := sts.GetCallerIdentityInput{}
	// call the service operation
	id, _ := stsClient.GetCallerIdentity(&request)
	// handle the response
	fmt.Printf("AccountId: %s, Arn: %s, UserId: %s", *id.Account, *id.Arn, *id.UserId)
}
