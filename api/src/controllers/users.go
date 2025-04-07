package controllers

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/auth"
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

	// Handle profile picture if it exists in the updates
	if profilePictureData, exists := updates["profilePicture"]; exists && profilePictureData != nil {
		// Convert to string and check if it's a base64 data URI
		profilePictureStr, ok := profilePictureData.(string)
		if !ok || profilePictureStr == "" {
			// Remove the key if it's not valid (as we can't use it for anything)
			delete(updates, "profilePicture")
		} else if strings.HasPrefix(profilePictureStr, "data:image/") { // checks if the profilePicture is a base64 image
			imagePath, err := saveProfilePicture(profilePictureStr, uint(userID)) // saves the profile picture to the api/uploads directory
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to save profile picture: " + err.Error()})
				return
			}

			// Store only the path in the database (instead of millions characters)
			updates["profile_picture_url"] = imagePath
			delete(updates, "profilePicture")
		}
	}

	// 'Push/commit' all these updates to the user in the database
	_, err = models.UpdateUser(uint(userID), updates)
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// Generate a new token for the user
	val, _ := ctx.Get("userID")
	tokenUserID := val.(string)
	token, _ := auth.GenerateToken(tokenUserID)

	// Send a success message to the frontend
	ctx.JSON(http.StatusCreated, gin.H{"message": "User updated successfully", "token": token})
}

// the below helper function handles saves the base64 image (which is sent as a string
// from the frontend) to the api/uploads directory (so that we can store a path in the DB)
func saveProfilePicture(base64Image string, userID uint) (string, error) {
	// Create uploads directory if it already doesn't exist
	uploadDir := "uploads/profile_pictures"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return "", fmt.Errorf("failed to create upload directory: %w", err)
	}

	// Split the base64 string to get the data part
	// apparently the first half is metadata and the second half is the actual image data
	// we want
	parts := strings.Split(base64Image, ",")
	if len(parts) != 2 {
		return "", fmt.Errorf("invalid base64 image format")
	}

	// Get the image format from the data URI
	metadata := parts[0]
	imageData := parts[1]

	// Determine the extension of the image
	var extension string
	if strings.Contains(metadata, "image/jpeg") || strings.Contains(metadata, "image/jpg") {
		extension = "jpg"
	} else if strings.Contains(metadata, "image/png") {
		extension = "png"
	} else if strings.Contains(metadata, "image/gif") {
		extension = "gif"
	} else {
		extension = "jpg" // we default to jpg if the extension is not found
	}

	// Finally decode the base64 image data
	decoded, err := base64.StdEncoding.DecodeString(imageData)
	if err != nil {
		return "", fmt.Errorf("failed to decode base64 image: %w", err)
	}

	// Generate a random/unique filename to be stored in the uploads directory
	timestamp := time.Now().Unix()
	filename := fmt.Sprintf("profile_%d_%d.%s", userID, timestamp, extension)
	fullPath := filepath.Join(uploadDir, filename)

	// Save the file
	if err := ioutil.WriteFile(fullPath, decoded, 0644); err != nil {
		return "", fmt.Errorf("failed to write image file: %w", err)
	}

	// Return the URL path that will be used to access the image
	return "/uploads/profile_pictures/" + filename, nil
}
