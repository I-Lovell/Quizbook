package seeds

import (
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

//This function combines and calls our other seed functions, dropping all tables
//migrating the database to recreate the tables and then filling them with our seeddata
func Reseed(db *gorm.DB)  {
	// !! WILL DROP ALL TABLES !! //
	DropTablesifExist(db)
	// !! WILL DROP ALL TABLES !! //

	models.AutoMigrateModels()

	SeedDatabase(db)
}