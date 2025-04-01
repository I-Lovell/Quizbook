package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/auth"
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
)

type JSONComment struct {
	ID      uint   `json:"_id"`
	Content string `json:"content"`
	UserID  uint   `json:"user_id"`
	PostID  uint   `json:"post_id"`
}

func GetCommentsByPostID(ctx *gin.Context) {
	postID := ctx.Param("post_id")
	postIDUint, err := strconv.ParseUint(postID, 10, 32)
	
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid post ID"})
		return
	}

	comments, err := models.FetchCommentsByPostID(uint(postIDUint))

	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	val, _ := ctx.Get("userID")
	userID := val.(string)
	token, _ := auth.GenerateToken(userID)

	// Convert comments to JSON Structs
	jsonComments := make([]JSONComment, 0)
	for _, comment := range *comments {
		jsonComments = append(jsonComments, JSONComment{
			ID:      comment.ID,
			Content: comment.Content,
			UserID:  comment.UserID,
			PostID:  comment.PostID,
		})
	}

	ctx.JSON(http.StatusOK, gin.H{"comments": jsonComments, "token": token})
}

type createCommentRequestBody struct {
	Content string `json:"content"`
	PostID  uint   `json:"post_id"`
}

func CreateComment(ctx *gin.Context) {
	var requestBody createCommentRequestBody
	err := ctx.BindJSON(&requestBody)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}

	if len(requestBody.Content) == 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Comment content empty"})
		return
	}

	val, _ := ctx.Get("userID")
	userID := val.(string)
	userIDUint, err := strconv.ParseUint(userID, 10, 32)
	
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	newComment := models.Comment{
		Content: requestBody.Content,
		PostID:  requestBody.PostID,
		UserID:  uint(userIDUint),
	}

	_, err = newComment.Save()
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	token, _ := auth.GenerateToken(userID)

	ctx.JSON(http.StatusCreated, gin.H{"message": "Comment created", "token": token})
} 