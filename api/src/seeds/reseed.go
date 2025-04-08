package seeds

import (
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

// This function combines and calls our other seed functions, dropping all tables
// migrating the database to recreate the tables and then filling them with our seeddata
func Reseed(db *gorm.DB) {
	DropTablesifExist(db)		// Drop all tables if they exist
	models.AutoMigrateModels()	// Create all tables if they don't exist
	SeedDatabase(db)			// Seed the database with initial data
}
