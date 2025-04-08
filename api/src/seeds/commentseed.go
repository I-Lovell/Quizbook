package seeds

import (
	"fmt"
	"time"

	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func CommentSeeds(db *gorm.DB) {
	// ⬇️ Create base time (10 days ago)
	baseTime := time.Now().AddDate(0, 0, -10)
	// ⬆️ We'll use this to create comments at different times (helpful for frontend sorting)

	// Example Comments created below
	// We create instances of the comment model all within a slice to iterate over later
	// Timestamps are set a bit after the related post's creation time
	comments := []models.Comment{
		{UserID: 2, PostID: 1, Content: "I thought it was Sydney!", Model: gorm.Model{CreatedAt: baseTime.Add(45 * time.Minute)}},
		{UserID: 3, PostID: 1, Content: "Common mistake, but Canberra is correct.", Model: gorm.Model{CreatedAt: baseTime.Add(50 * time.Minute)}},
		{UserID: 1, PostID: 2, Content: "I love Graham Greene's novels too.", Model: gorm.Model{CreatedAt: baseTime.Add(1*time.Hour + 15*time.Minute)}},
		{UserID: 4, PostID: 3, Content: "Go Patriots!", Model: gorm.Model{CreatedAt: baseTime.Add(2*time.Hour + 20*time.Minute)}},
		{UserID: 5, PostID: 5, Content: "Such a great film.", Model: gorm.Model{CreatedAt: baseTime.Add(8*time.Hour + 30*time.Minute)}},
		{UserID: 2, PostID: 7, Content: "Cream Puff was amazing.", Model: gorm.Model{CreatedAt: baseTime.Add(49 * time.Hour)}},
		{UserID: 3, PostID: 4, Content: "I remember when that photo was released. Historic moment!", Model: gorm.Model{CreatedAt: baseTime.Add(4*time.Hour + 45*time.Minute)}},
		{UserID: 1, PostID: 6, Content: "38 years?! That's incredible for a cat.", Model: gorm.Model{CreatedAt: baseTime.Add(25 * time.Hour)}},
		{UserID: 5, PostID: 7, Content: "Mrs Biscuits sounds adorable.", Model: gorm.Model{CreatedAt: baseTime.Add(50 * time.Hour)}},
	}

	// Here we iterate over the slice of comments, save each to a database and print
	// either a confirmation or error
	for _, comment := range comments {
		err := db.Save(&comment).Error
		if err != nil {
			fmt.Printf("Error when creating comment: %s\n", comment.Content)
		} else {
			fmt.Printf("Successfully created comment: %s (Created at: %s)\n", comment.Content, comment.CreatedAt.Format("2006-01-02 15:04:05"))
		}
	}
}
