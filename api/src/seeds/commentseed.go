package seeds

import (
	"fmt"

	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func CommentSeeds(db *gorm.DB) {
	// Comments to seed
	comments := []models.Comment{
		{UserID: 2, PostID: 1, Content: "I thought it was Sydney!"},
		{UserID: 3, PostID: 1, Content: "That's what people always say, but Canberra is correct."},
		{UserID: 1, PostID: 2, Content: "I love Graham Greene's novels too."},
		{UserID: 4, PostID: 3, Content: "Go Patriots!"},
		{UserID: 5, PostID: 5, Content: "Such a great film."},
		{UserID: 2, PostID: 7, Content: "Cream Puff was amazing."},
		{UserID: 3, PostID: 4, Content: "I can confirm, I was the blackhole in the picture."},
		{UserID: 1, PostID: 6, Content: "38 years?! That's incredible for a cat."},
		{UserID: 5, PostID: 7, Content: "Mrs Biscuits sounds adorable."},
	}

	// Here we iterate over the above slice of comments, save each to a database and print
	// either a confirmation or error
	for _, comment := range comments {
		err := db.Save(&comment).Error
		if err != nil {
			fmt.Printf("Error when creating comment: %s\n", comment.Content)
		} else {
			fmt.Printf("Successfully created comment: %s\n", comment.Content)
		}
	}
}
