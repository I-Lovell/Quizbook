package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
)

func CreateUser(ctx *gin.Context) {
	var newUser models.User
	err := ctx.BindJSON(&newUser)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if newUser.Email == "" || newUser.Password == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Must supply username and password"})
		return
	}

	_, err = newUser.Save()
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "OK"})
}

func UpdateUser(ctx *gin.Context) {
	// Get user ID
	userIDStr, exists := ctx.Get("userID")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}
	
	// Check if userID is nil
	if userIDStr == nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "User ID is nil"})
		return
	}
	
	// Safely convert to string
	userIDString, ok := userIDStr.(string)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid user ID format"})
		return
	}
	
	userID, err := strconv.ParseUint(userIDString, 10, 64)
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// Parse request body
	var updates map[string]interface{}
	if err := ctx.BindJSON(&updates); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	// Handle specific profile picture update
	if profilePicture, exists := updates["profilePicture"]; exists {
		updates["profile_picture_url"] = profilePicture
		delete(updates, "profilePicture")
	}

	// Update user in database
	_, err = models.UpdateUser(uint(userID), updates)
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "User updated successfully"})
}
