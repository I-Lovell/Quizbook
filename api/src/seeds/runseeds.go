package seeds

import (
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func SeedDatabase(db *gorm.DB)  {
	UserSeeds(db)
	PostSeeds(db)
}

func DropTablesifExist(db *gorm.DB)  {
	// This function executes raw SQL to reseed the database with example data
	// DO NOT INCLUDE IN main.go IF YOU HAVE DATA YOU WANT THAT LIVES OUTSIDE THE
	//SEED FILE
	
	// Posts table
	var post models.Post
	check_posts := db.First(&post)

	if check_posts.Error == nil {
		db.Exec("DROP TABLE posts CASCADE")
	}
	//Users table
	var user models.User
	check_users := db.First(&user)

	if check_users.Error == nil {
		db.Exec("DROP TABLE users CASCADE")
	}

}