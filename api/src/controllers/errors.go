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

// ======= Checks if username or email are already taken when user signs up ============

func CheckForDuplicateKeyError(ctx *gin.Context, err error) {
	if strings.Contains(err.Error(), "username") {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Username"})
	} else if strings.Contains(err.Error(), "email") {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Email"})
	} else {
		SendInternalError(ctx, err)
	}
}