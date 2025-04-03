package seeds

import (
	"fmt"

	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func PostSeeds(db *gorm.DB)  {
	posts := []models.Post{
		{UserID: 1, Question: "What is the capital city of australia?", Answer: "Canberra"},
		{UserID: 5, Question: "Which famous crime writer wrote the script for Orson Welles 1949 film noir classic The Third Man?", Answer: "Graham Greene"},
		{UserID: 3, Question: "Which American Football team has the highest number of superbowl wins?", Answer: "As of 2025 The New England Patriots are tied with the PittsBurgh Steelers"},
		{UserID: 1, Question: "When was the first ever photograph of a black hole taken?", Answer: "2019"},
		{UserID: 4, Question: "Which film won best picture at the 2017 Oscars?", Answer: "Moonlight"},
		{UserID: 2, Question: "How old was the oldest cat in the world?", Answer: "38 years old! His name was Cream Puff."},
		{UserID: 2, Question: "Which cat is the best cat?", Answer: "My cat, her name is Mrs Biscuits."},
	}

	for _, post := range posts {
		err := db.Save(&post).Error
		if err != nil {
			fmt.Printf("Error when create users: %s\n", post.Question)
		} else {
			fmt.Printf("Sucessfully created post: %s\n", post.Question)
		}
	}
}