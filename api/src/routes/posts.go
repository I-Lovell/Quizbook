package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/controllers"
	"github.com/makersacademy/go-react-acebook-template/api/src/middleware"
)

func setupPostRoutes(baseRouter *gin.RouterGroup) {
	posts := baseRouter.Group("/posts")

	posts.POST("", middleware.AuthenticationMiddleware, controllers.CreatePost)
	posts.GET("", middleware.AuthenticationMiddleware, controllers.GetAllPosts)
	posts.GET("/:id", middleware.AuthenticationMiddleware, controllers.GetPostByID)
	posts.GET("/user/:id", middleware.AuthenticationMiddleware, controllers.GetPostsByUserID) // Returns all posts by a specific user
	posts.GET("/self", middleware.AuthenticationMiddleware, controllers.GetCurrentUserPosts)  // Returns all posts by the currently logged in user
	posts.PUT("/:id", middleware.AuthenticationMiddleware, controllers.UpdatePost)            // Updates a post by its ID

}
