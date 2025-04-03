package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/env"
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"github.com/makersacademy/go-react-acebook-template/api/src/routes"
	"github.com/makersacademy/go-react-acebook-template/api/src/seeds"
)

func main() {
	env.LoadEnv()

	app := setupApp()

	
	models.OpenDatabaseConnection()

	// !! WILL DROP ALL TABLES WHEN MAIN RUNS !! //
	seeds.DropTablesifExist(models.Database)
	// !! WILL DROP ALL TABLES WHEN MAIN RUNS !! //

	models.AutoMigrateModels()

	seeds.SeedDatabase(models.Database)
	app.Run(":8082")
}

func setupApp() *gin.Engine {
	app := gin.Default()
	setupCORS(app)
	routes.SetupRoutes(app)
	return app
}

func setupCORS(app *gin.Engine) {
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	config.AllowHeaders = []string{"Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"}

	app.Use(cors.New(config))
}
