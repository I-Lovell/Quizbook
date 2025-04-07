package controllers

import (
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
)

func SendInternalError(ctx *gin.Context, err error) {
	if gin.Mode() == "release" {
		ctx.JSON(http.StatusInternalServerError, gin.H{"err": "Something went wrong"})
	} else {
		ctx.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
	}
}

// ======= Checks if username, email or password are already taken when user signs up ============

func CheckForDuplicateKeyError(ctx *gin.Context, err error) {
	if strings.Contains(err.Error(), "username") {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Username taken by other user"})
	} else if strings.Contains(err.Error(), "email") {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Email taken by other user"})
	} else if strings.Contains(err.Error(), "password") {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message":"Password taken by other user"})
	} else {
		SendInternalError(ctx, err)
	}
}