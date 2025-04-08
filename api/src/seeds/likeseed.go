package seeds

import (
	"fmt"

	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func LikeSeeds(db *gorm.DB) {
	// Likes to seed
	likes := []models.Like{
		{UserID: 1, PostID: 2},
		{UserID: 2, PostID: 1},
		{UserID: 3, PostID: 1},
		{UserID: 4, PostID: 1},
		{UserID: 5, PostID: 2},
		{UserID: 2, PostID: 3},
		{UserID: 1, PostID: 5},
		{UserID: 3, PostID: 6},
		{UserID: 4, PostID: 7},
		{UserID: 5, PostID: 4},
		{UserID: 1, PostID: 7},
	}

	// Here we iterate over the above slice of likes, save each to a database and print
	// either a confirmation or error
	for _, like := range likes {
		err := db.Save(&like).Error
		if err != nil {
			fmt.Printf("Error when creating like for Post ID: %d by User ID: %d\n", like.PostID, like.UserID)
		} else {
			fmt.Printf("Successfully created like for Post ID: %d by User ID: %d\n", like.PostID, like.UserID)
		}
	}
}
