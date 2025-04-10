package seeds

import (
	"gorm.io/gorm"
)

func SeedDatabase(db *gorm.DB) {
	//This function calls all the seed functions
	UserSeeds(db)
	PostSeeds(db)
	CommentSeeds(db)
	LikeSeeds(db)
}

func DropTablesifExist(db *gorm.DB) {
	// This function executes raw SQL to drop all tables before reseeding

	// likes table
	db.Exec("DROP TABLE IF EXISTS likes")
	
	// comments table
	db.Exec("DROP TABLE IF EXISTS comments")
	
	// posts table
	db.Exec("DROP TABLE IF EXISTS posts CASCADE")
	
	//users table
	db.Exec("DROP TABLE IF EXISTS users CASCADE")
	
}
