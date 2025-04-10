package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/controllers"
	"github.com/makersacademy/go-react-acebook-template/api/src/middleware"
)

func setupCommentRoutes(baseRouter *gin.RouterGroup) {
	comments := baseRouter.Group("/comments")

	comments.POST("", middleware.AuthenticationMiddleware, controllers.CreateComment)
	comments.GET("/post/:post_id", middleware.AuthenticationMiddleware, controllers.GetCommentsByPostID)
	comments.DELETE("/:id", middleware.AuthenticationMiddleware, controllers.DeleteCommentByID)
}
