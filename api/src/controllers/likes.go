package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/auth"
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
)

type JSONLike struct {
	ID     uint `json:"_id"`
	UserID uint `json:"user_id"`
	PostID uint `json:"post_id"`
}

func GetLikesByPostID(ctx *gin.Context) {
	postID := ctx.Param("post_id")
	postIDUint, err := strconv.ParseUint(postID, 10, 32)
	
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid post ID"})
		return
	}

	likes, err := models.FetchLikesByPostID(uint(postIDUint))

	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	val, _ := ctx.Get("userID")
	userID := val.(string)
	token, _ := auth.GenerateToken(userID)

	// Convert likes to JSON Structs
	jsonLikes := make([]JSONLike, 0)
	for _, like := range *likes {
		jsonLikes = append(jsonLikes, JSONLike{
			ID:     like.ID,
			UserID: like.UserID,
			PostID: like.PostID,
		})
	}

	ctx.JSON(http.StatusOK, gin.H{"likes": jsonLikes, "token": token})
}

type createLikeRequestBody struct {
	PostID uint `json:"post_id"`
}

func CreateLike(ctx *gin.Context) {

	// ========== Get request body ==========
	var requestBody createLikeRequestBody
	err := ctx.BindJSON(&requestBody)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}

	// ============ Get user ID =============
	val, _ := ctx.Get("userID")
	userID := val.(string)
	userIDUint, err := strconv.ParseUint(userID, 10, 32)
	
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// =========== Generate token ===========
	token, _ := auth.GenerateToken(userID)

	// ========== Check if a like already exists for this user and post ==========
	existingLike, err := models.FindLikeByUserIDAndPostID(uint(userIDUint), requestBody.PostID)

	// ========== Toggle like status ==========
	if err == nil && existingLike != nil {
		// Case 1: Like exists, so unlike (delete it)
		err = existingLike.Delete() // gorm does this by adding to the deleted_at column
		if err != nil {
			SendInternalError(ctx, err)
			return
		}
		// ========== Send success message ==========
		ctx.JSON(http.StatusOK, gin.H{"message": "Like removed", "token": token})
		return
		} else if err != nil && err.Error() != "record not found" {
			SendInternalError(ctx, err) // this should never happen
			return
		}
		
		// Case 2: Like doesn't exist, so create it
		newLike := models.Like{
			PostID: requestBody.PostID,
			UserID: uint(userIDUint),
		}
		
		// and then save the new like to the DB
		_, err = newLike.Save()
		if err != nil {
			SendInternalError(ctx, err)
			return
		}
		
		// ========== Send success message ==========
	ctx.JSON(http.StatusCreated, gin.H{"message": "Like created", "token": token})
} 