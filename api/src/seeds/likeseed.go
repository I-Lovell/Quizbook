package seeds

import (
	"fmt"
	"time"

	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func LikeSeeds(db *gorm.DB) {
	// ⬇️ Create base time (10 days ago)
	baseTime := time.Now().AddDate(0, 0, -10)
	// ⬆️ We'll use this to create likes at different times (helpful for frontend sorting)

	// Example Likes created below
	// We create instances of the like model all within a slice to iterate over later
	// Timestamps are set after the related post's creation time
	likes := []models.Like{
		{UserID: 1, PostID: 2, Model: gorm.Model{CreatedAt: baseTime.Add(1*time.Hour + 30*time.Minute)}},
		{UserID: 2, PostID: 1, Model: gorm.Model{CreatedAt: baseTime.Add(1 * time.Hour)}},
		{UserID: 3, PostID: 1, Model: gorm.Model{CreatedAt: baseTime.Add(1*time.Hour + 5*time.Minute)}},
		{UserID: 4, PostID: 1, Model: gorm.Model{CreatedAt: baseTime.Add(1*time.Hour + 10*time.Minute)}},
		{UserID: 5, PostID: 2, Model: gorm.Model{CreatedAt: baseTime.Add(2 * time.Hour)}},
		{UserID: 2, PostID: 3, Model: gorm.Model{CreatedAt: baseTime.Add(3 * time.Hour)}},
		{UserID: 1, PostID: 5, Model: gorm.Model{CreatedAt: baseTime.Add(9 * time.Hour)}},
		{UserID: 3, PostID: 6, Model: gorm.Model{CreatedAt: baseTime.Add(26 * time.Hour)}},
		{UserID: 4, PostID: 7, Model: gorm.Model{CreatedAt: baseTime.Add(50 * time.Hour)}},
		{UserID: 5, PostID: 4, Model: gorm.Model{CreatedAt: baseTime.Add(5 * time.Hour)}},
		{UserID: 1, PostID: 7, Model: gorm.Model{CreatedAt: baseTime.Add(52 * time.Hour)}},
	}

	// Here we iterate over the slice of likes, save each to a database and print
	// either a confirmation or error
	for _, like := range likes {
		err := db.Save(&like).Error
		if err != nil {
			fmt.Printf("Error when creating like for Post ID: %d by User ID: %d\n", like.PostID, like.UserID)
		} else {
			fmt.Printf("Successfully created like for Post ID: %d by User ID: %d (Created at: %s)\n",
				like.PostID, like.UserID, like.CreatedAt.Format("2006-01-02 15:04:05"))
		}
	}
}
