package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/controllers"
	"github.com/makersacademy/go-react-acebook-template/api/src/middleware"
)

func setupLikeRoutes(baseRouter *gin.RouterGroup) {
	likes := baseRouter.Group("/likes")

	likes.POST("", middleware.AuthenticationMiddleware, controllers.CreateLike)
	likes.GET("/post/:post_id", middleware.AuthenticationMiddleware, controllers.GetLikesByPostID)
} 