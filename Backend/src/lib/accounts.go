package lib

import (
	"log"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

// GetUserAccounts retrns a list of allowed users
func GetUserAccounts() *gin.Accounts {
	accountsString := os.Getenv("USER_ACCOUNTS")
	accounts := gin.Accounts{}

	accountsSplit := strings.Split(accountsString, ",")

	if len(accountsSplit) < 1 || len(accountsSplit[0]) < 1 {
		log.Fatalln("no user accounts found")
	}

	for _, account := range accountsSplit {
		accountSplit := strings.Split(account, ":")
		accounts[accountSplit[0]] = accountSplit[1]
	}

	return &accounts
}
