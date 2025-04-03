package seeds

import (
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func PostSeeds(db *gorm.DB)  {
	posts := []models.Post{
		{UserID: 1, Question: "What is the capital city of australia?", Answer: "Canberra"},
		{UserID: 2, Question: "Which famous crime writer wrote the script for Orson Welles 1949 film noir classic The Third Man?", Answer: "Graham Greene"},
		{UserID: 3, Question: "Which American Football team has the highest number of superbowl wins?", Answer: "As of 2025 The New England Patriots are tied with the PittsBurgh Steelers"},
		{UserID: 2, Question: "When was the first ever photograph of a black hole taken?", Answer: "2019"},
		{UserID: 4, Question: "Which film won best picture at the 2017 Oscars?", Answer: "Moonlight"},
	}
}