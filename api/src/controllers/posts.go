package controllers

import (
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/auth"
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
)

type PostCommentJSON struct {
	UserID   uint   `json:"userID"`
	Username string `json:"username"`
	Contents string `json:"contents"`
}

type JSONPost struct {
	ID         uint              `json:"_id"`
	Question   string            `json:"question"`
	Answer     string            `json:"answer"`
	UserID     uint              `json:"user_id"`
	Username   string            `json:"username"`
	Comments   []PostCommentJSON `json:"comments"`
	NumOfLikes int               `json:"numOfLikes"`
	CreatedAt  string            `json:"created_at"`
}

func GetAllPosts(ctx *gin.Context) {
	// ============================= Fetch all posts from the database ==========================
	posts, err := models.FetchAllPosts()
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ========== Get the user ID from the context (set by AuthenticationMiddleware) ============
	val, _ := ctx.Get("userID")
	userID := val.(string)
	token, _ := auth.GenerateToken(userID)

	// ============================= Convert posts to JSON Structs ==============================
	jsonPosts := make([]JSONPost, 0)
	for _, post := range *posts {
		// Grab the post author's username
		author, err := models.FindUser(strconv.Itoa(int(post.UserID)))
		authorUsername := "Unknown" // Default if author not found, although this shouldn't happen
		if err == nil {
			authorUsername = author.Username
		}

		// grab comments for the post
		comments, err := models.FetchCommentsByPostID(post.ID)
		if err != nil {
			// I think this is probably the best way to hangle this? maybe continue to next post?
			// For now, we'll just send an internal error for simplicity.
			SendInternalError(ctx, err)
			return
		}

		// ============================= Convert comments to JSON Structs ==========================
		jsonComments := make([]PostCommentJSON, 0)
		for _, comment := range *comments {
			// Find the user who made the comment to get their username
			user, err := models.FindUser(strconv.Itoa(int(comment.UserID)))
			username := "Unknown" // Again, this shouldn't happen, but just in case
			if err == nil {
				username = user.Username
			}

			// Append the comment to the JSON comments
			jsonComments = append(jsonComments, PostCommentJSON{
				UserID:   comment.UserID,
				Username: username,
				Contents: comment.Content,
			})
		}

		// ============================= Fetch likes for the post ===================================
		likes, err := models.FetchLikesByPostID(post.ID)
		if err != nil {
			SendInternalError(ctx, err)
			return
		}
		numOfLikes := len(*likes)

		// ============================= Append to JSON posts for response ==========================
		jsonPosts = append(jsonPosts, JSONPost{
			ID:         post.ID,
			Question:   post.Question,
			Answer:     post.Answer,
			UserID:     post.UserID,
			Username:   authorUsername,
			Comments:   jsonComments,
			NumOfLikes: numOfLikes,
			CreatedAt:  post.CreatedAt.Format(time.RFC3339),
		})
	}

	// ============================ Send response (including token) ================================
	ctx.JSON(http.StatusOK, gin.H{"posts": jsonPosts, "token": token})
}

type createPostRequestBody struct {
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

func CreatePost(ctx *gin.Context) {
	// ============================= Get the request body =========================================
	var requestBody createPostRequestBody
	err := ctx.BindJSON(&requestBody)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}

	// ============================= Check if the post question is empty =========================
	if len(requestBody.Question) == 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Post question empty"})
		return
	}

	// ========== Get the user ID from the context (set by AuthenticationMiddleware) ============
	val, _ := ctx.Get("userID")
	userID, ok := val.(string)
	if !ok {
		SendInternalError(ctx, errors.New("userID is not a string"))
		return
	}

	// ================== Convert userID string to uint for the database ========================
	parsed, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ============================= Create the new post =========================================
	// Create the new post
	newPost := models.Post{
		Question: requestBody.Question,
		Answer:   requestBody.Answer,
		UserID:   uint(parsed),
	}

	// Save the new post to the database
	_, err = newPost.Save()
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ========================== Generate token & send response ================================
	token, _ := auth.GenerateToken(userID)
	ctx.JSON(http.StatusCreated, gin.H{"message": "Post created", "token": token})
}

func GetPostsByUserID(ctx *gin.Context) {
	// ======================= Get the user ID from the URL params ==============================
	userIDParam := ctx.Param("id")
	userID, err := strconv.ParseUint(userIDParam, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	// ============================= Fetch posts by the user ID =================================
	posts, err := models.FetchPostsByUserID(uint(userID))
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ========== Get the user ID from the context (set by AuthenticationMiddleware) ============
	val, _ := ctx.Get("userID")
	tokenUserID := val.(string)
	token, _ := auth.GenerateToken(tokenUserID)

	// ============================= Convert posts to JSON Structs ==============================
	jsonPosts := make([]JSONPost, 0)
	for _, post := range *posts {
		// Grab the post author's username
		author, err := models.FindUser(strconv.Itoa(int(post.UserID)))
		authorUsername := "Unknown"
		if err == nil {
			authorUsername = author.Username
		}
		comments, err := models.FetchCommentsByPostID(post.ID)
		if err != nil {
			SendInternalError(ctx, err)
			return
		}

		// Grab comments for the post
		jsonComments := make([]PostCommentJSON, 0)
		for _, comment := range *comments {
			user, err := models.FindUser(strconv.Itoa(int(comment.UserID)))
			username := "Unknown"
			if err == nil {
				username = user.Username
			}
			jsonComments = append(jsonComments, PostCommentJSON{
				UserID:   comment.UserID,
				Username: username,
				Contents: comment.Content,
			})
		}

		// Grab likes for the post
		likes, err := models.FetchLikesByPostID(post.ID)
		if err != nil {
			SendInternalError(ctx, err)
			return
		}
		numOfLikes := len(*likes)

		// ========================= Append to JSON posts for response ============================
		jsonPosts = append(jsonPosts, JSONPost{
			ID:         post.ID,
			Question:   post.Question,
			Answer:     post.Answer,
			UserID:     post.UserID,
			Username:   authorUsername,
			Comments:   jsonComments,
			NumOfLikes: numOfLikes,
		})
	}

	// ========================== Generate token & send response ================================
	ctx.JSON(http.StatusOK, gin.H{"posts": jsonPosts, "token": token})
}

func GetCurrentUserPosts(ctx *gin.Context) {

	// ========== Get the user ID from the context (set by AuthenticationMiddleware) ============
	val, _ := ctx.Get("userID")
	userID, ok := val.(string)
	if !ok {
		SendInternalError(ctx, errors.New("userID is not a string"))
		return
	}

	parsed, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ========================= Fetch posts by the current user's ID ===========================
	posts, err := models.FetchPostsByUserID(uint(parsed))
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	// ============================= Convert posts to JSON Structs ==============================
	jsonPosts := make([]JSONPost, 0)
	for _, post := range *posts {
		// Fetch the post author's username
		author, err := models.FindUser(strconv.Itoa(int(post.UserID)))
		authorUsername := "Unknown"
		if err == nil {
			authorUsername = author.Username
		}

		// Fetch comments for the post
		comments, err := models.FetchCommentsByPostID(post.ID)
		if err != nil {
			SendInternalError(ctx, err)
			return
		}

		jsonComments := make([]PostCommentJSON, 0)
		for _, comment := range *comments {
			user, err := models.FindUser(strconv.Itoa(int(comment.UserID)))
			username := "Unknown"
			if err == nil {
				username = user.Username
			}
			jsonComments = append(jsonComments, PostCommentJSON{
				UserID:   comment.UserID,
				Username: username,
				Contents: comment.Content,
			})
		}

		// ============================= Fetch likes for the post ===================================
		likes, err := models.FetchLikesByPostID(post.ID)
		if err != nil {
			SendInternalError(ctx, err)
			return
		}
		numOfLikes := len(*likes)

		// ========================= Append to JSON posts for response ================================
		jsonPosts = append(jsonPosts, JSONPost{
			ID:         post.ID,
			Question:   post.Question,
			Answer:     post.Answer,
			UserID:     post.UserID,
			Username:   authorUsername,
			Comments:   jsonComments,
			NumOfLikes: numOfLikes,
		})
	}

	// ========================== Generate token & send response ================================
	token, _ := auth.GenerateToken(userID)
	ctx.JSON(http.StatusOK, gin.H{"posts": jsonPosts, "token": token})
}

func GetPostByID(ctx *gin.Context) {
	postIDParam := ctx.Param("id")
	postID, err := strconv.ParseUint(postIDParam, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid post ID"})
		return
	}

	post, err := models.FetchPostByID(uint(postID))
	if err != nil {
		if err.Error() == "record not found" { // if there's no post with that ID
			ctx.JSON(http.StatusNotFound, gin.H{"message": "Post not found"})
		} else {
			SendInternalError(ctx, err)
		}
		return
	}

	// Fetch the post author's username
	author, err := models.FindUser(strconv.Itoa(int(post.UserID)))
	authorUsername := "Unknown"
	if err == nil {
		authorUsername = author.Username
	}

	// Grab comments for the post
	comments, err := models.FetchCommentsByPostID(post.ID)
	if err != nil {
		SendInternalError(ctx, err)
		return
	}
	jsonComments := make([]PostCommentJSON, 0)
	for _, comment := range *comments {
		user, err := models.FindUser(strconv.Itoa(int(comment.UserID)))
		username := "Unknown"
		if err == nil {
			username = user.Username
		}
		jsonComments = append(jsonComments, PostCommentJSON{
			UserID:   comment.UserID,
			Username: username,
			Contents: comment.Content,
		})
	}

	// Grab likes for the post
	likes, err := models.FetchLikesByPostID(post.ID)
	if err != nil {
		SendInternalError(ctx, err)
		return
	}
	numOfLikes := len(*likes)

	jsonPost := JSONPost{
		ID:         post.ID,
		Question:   post.Question,
		Answer:     post.Answer,
		UserID:     post.UserID,
		Username:   authorUsername,
		Comments:   jsonComments,
		NumOfLikes: numOfLikes,
	}

	val, _ := ctx.Get("userID")
	userID := val.(string)
	token, _ := auth.GenerateToken(userID)

	ctx.JSON(http.StatusOK, gin.H{"post": jsonPost, "token": token})
}
