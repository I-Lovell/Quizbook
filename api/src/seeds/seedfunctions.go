package seeds

import (
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func SeedDatabase(db *gorm.DB)  {
	//This function calls all the seed functions
	UserSeeds(db)
	PostSeeds(db)
}

func DropTablesifExist(db *gorm.DB)  {
	// This function executes raw SQL to drop all tables before reseeding

	// likes table
	var like models.Comment
	check_likes := db.First(&like)

	if check_likes.Error == nil {
		db.Exec("DROP TABLE likes")
	}

	// comments table
	var comment models.Comment
	check_comments := db.First(&comment)

	if check_comments.Error == nil {
		db.Exec("DROP TABLE comments")
	}

	// posts table
	var post models.Post
	check_posts := db.First(&post)

	if check_posts.Error == nil {
		db.Exec("DROP TABLE posts CASCADE")
	}

	//users table
	var user models.User
	check_users := db.First(&user)

	if check_users.Error == nil {
		db.Exec("DROP TABLE users CASCADE")
	}

}