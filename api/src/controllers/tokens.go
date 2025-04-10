package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/auth"
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"github.com/makersacademy/go-react-acebook-template/api/src/passwordhashing"
)

type CreateTokenRequestBody struct {
	Email    string
	Password string
}

func CreateToken(ctx *gin.Context) {
	var input CreateTokenRequestBody
	err := ctx.ShouldBindJSON(&input)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	// Try to find the active user first
	user, err := models.FindUserByEmail(input.Email)

	// Flag to track if user was restored
	wasRestored := false

	// If user not found, check if they might be a soft-deleted user
	if err != nil {
		// Try to restore the user if they were soft-deleted
		restoredUser, restoreErr := models.RestoreDeletedUser(input.Email)
		if restoreErr != nil {
			// If restoration failed or user doesn't exist, return the original error
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid email or password"})
			return
		}

		// If restoration succeeded, use the restored user
		user = restoredUser
		wasRestored = true
	}

	passwordVerified := passwordhashing.VerifyPassword(user.Password, input.Password)

	if !passwordVerified {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Password incorrect"})
		return
	}

	token, err := auth.GenerateToken(fmt.Sprintf("%d", user.ID))
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// Add a message indicating if a user was restored
	message := "OK"
	if wasRestored {
		message = "Account restored successfully"
	}

	ctx.JSON(http.StatusCreated, gin.H{"token": token, "message": message})
}
