package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/auth"
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
)

type JSONComment struct {
	ID       uint   `json:"_id"`
	Content  string `json:"content"`
	UserID   uint   `json:"userID"`
	Username string `json:"username"`
	PostID   uint   `json:"post_id"`
}

func GetCommentsByPostID(ctx *gin.Context) {
	// ========== Get the post ID from the URL params ==========
	postID := ctx.Param("post_id")
	postIDUint, err := strconv.ParseUint(postID, 10, 32)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid post ID"})
		return
	}

	// ========== Fetch the comments for the post ==========
	comments, err := models.FetchCommentsByPostID(uint(postIDUint))
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ========== Get the user ID from the context ==========
	val, _ := ctx.Get("userID")
	userID := val.(string)
	token, _ := auth.GenerateToken(userID)

	// ========== Convert comments to JSON Structs ==========
	jsonComments := make([]JSONComment, 0)
	for _, comment := range *comments {
		// Find the user who made the comment to get their username
		username := "Unknown" // Default if user not found
		user, err := models.FindUser(strconv.Itoa(int(comment.UserID)))
		if err == nil {
			username = user.Username
		}

		jsonComments = append(jsonComments, JSONComment{
			ID:       comment.ID,
			Content:  comment.Content,
			UserID:   comment.UserID,
			Username: username,
			PostID:   comment.PostID,
		})
	}

	// ========== Send the response (w/ token) ==========
	ctx.JSON(http.StatusOK, gin.H{"comments": jsonComments, "token": token})
}

type createCommentRequestBody struct {
	Content string `json:"content"`
	PostID  uint   `json:"post_id"`
}

func CreateComment(ctx *gin.Context) {
	// ========== Get the request body ==========
	var requestBody createCommentRequestBody
	err := ctx.BindJSON(&requestBody)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}

	// ========== Check if the comment content is empty ==========
	if len(requestBody.Content) == 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Comment content empty"})
		return
	}

	// ========== Get the user ID from the context ==========
	val, _ := ctx.Get("userID")
	userID := val.(string)
	userIDUint, err := strconv.ParseUint(userID, 10, 32)

	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ========== Create a new comment ==========
	newComment := models.Comment{
		Content: requestBody.Content,
		PostID:  requestBody.PostID,
		UserID:  uint(userIDUint),
	}

	// ========= Save new comment to DB =========
	_, err = newComment.Save()
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ========== Send the response (w/ token) ==========
	token, _ := auth.GenerateToken(userID)
	ctx.JSON(http.StatusCreated, gin.H{"message": "Comment created", "token": token})
}

func DeleteCommentByID(ctx *gin.Context) {
	// ========== Get the comment ID from the URL ==========
	commentID := ctx.Param("id")
	commentIDUint, err := strconv.ParseUint(commentID, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid comment ID"})
		return
	}

	// ========== Get the user ID ==========
	userIDstr, exists := ctx.Get("userID")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	// Convert userID to string
	userIDstring, ok := userIDstr.(string)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid user ID format"})
		return
	}

	// Convert userID to uint
	userID, err := strconv.ParseUint(userIDstring, 10, 32)
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ========== Fetch the comment by ID ==========
	comment, err := models.FetchCommentByID(uint(commentIDUint))
	if err != nil {
		if err.Error() == "record not found" {
			ctx.JSON(http.StatusNotFound, gin.H{"message": "Comment not found"})
			return
		}
		SendInternalError(ctx, err)
		return
	}

	// ========== Check if the user is the owner of the comment ==========
	if comment.UserID != uint(userID) {
		ctx.JSON(http.StatusForbidden, gin.H{"message": "You are not authorised to delete this comment"})
		return
	}

	// ========== Delete the comment ==========
	err = models.DeleteCommentByID(uint(commentIDUint))
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ========== Send the response (w/ token) ==========
	token, _ := auth.GenerateToken(userIDstring)
	ctx.JSON(http.StatusOK, gin.H{"message": "Comment deleted successfully", "token": token})
}
