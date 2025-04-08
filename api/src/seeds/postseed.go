package seeds

import (
	"fmt"
	"time"

	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func PostSeeds(db *gorm.DB) {
	// ⬇️ Create base time (10 days ago)
	baseTime := time.Now().AddDate(0, 0, -10)
	// ⬆️ We'll use this to create posts at different times (helpful for frontend sorting)

	//Example Posts created below
	//We create instances of the post model all within a slice to iterate over later
	posts := []models.Post{
		{UserID: 1, Question: "What is the capital city of australia?", Answer: "Canberra", Model: gorm.Model{CreatedAt: baseTime.Add(30 * time.Minute)}},
		{UserID: 5, Question: "Which famous crime writer wrote the script for Orson Welles 1949 film noir classic The Third Man?", Answer: "Graham Greene", Model: gorm.Model{CreatedAt: baseTime.Add(1 * time.Hour)}},
		{UserID: 3, Question: "Which American Football team has the highest number of superbowl wins?", Answer: "As of 2025 The New England Patriots are tied with the PittsBurgh Steelers", Model: gorm.Model{CreatedAt: baseTime.Add(2 * time.Hour)}},
		{UserID: 1, Question: "When was the first ever photograph of a black hole taken?", Answer: "2019", Model: gorm.Model{CreatedAt: baseTime.Add(4 * time.Hour)}},
		{UserID: 4, Question: "Which film won best picture at the 2017 Oscars?", Answer: "Moonlight", Model: gorm.Model{CreatedAt: baseTime.Add(8 * time.Hour)}},
		{UserID: 2, Question: "How old was the oldest cat in the world?", Answer: "38 years old! His name was Cream Puff.", Model: gorm.Model{CreatedAt: baseTime.Add(24 * time.Hour)}},
		{UserID: 2, Question: "Which cat is the best cat?", Answer: "My cat, her name is Mrs Biscuits.", Model: gorm.Model{CreatedAt: baseTime.Add(48 * time.Hour)}},
	}

	//Here we iterate over the slice of posts, save each to a database and print
	//either a confirmation or error
	for _, post := range posts {
		err := db.Save(&post).Error
		if err != nil {
			fmt.Printf("Error when creating post: %s\n", post.Question)
		} else {
			fmt.Printf("Successfully created post: %s (Created at: %s)\n", post.Question, post.CreatedAt.Format("2006-01-02 15:04:05"))
		}
	}
}
