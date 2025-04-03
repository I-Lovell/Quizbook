package seeds

import (
	"fmt"

	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func UserSeeds(db *gorm.DB) {
	//Example Users created below
	users := []models.User{
		{Username: "quizguy", Email: "quiz@email.com", Password: "ilovequiz", FirstName: "John", Surname: "Smith", Bio: "I love me a good pub quiz"},
		{Username: "CoolCat", Email: "cat@cat.com", Password: "mouse", FirstName: "Percival", Surname: "Green", Bio: "I am interested in cat based quizes"},
		{Username: "NoSoftQuestions", Email: "cynic@eyebrowraise.com", Password: "socrates1992", FirstName: "Lucy", Surname: "Stone", Bio: "No one has ever answered one of my questions correctly"},
		{Username: "CustardLover", Email: "custard@pudding.com", Password: "cake", FirstName: "Carol", Surname: "Harvester", Bio: "I only signed up because i thought this was a baking website"},
		{Username: "QuizzicalQuentin", Email: "quentin@email.com", Password: "p@ssword!", FirstName: "Quentin", Surname: "Quentin", Bio: "I don't have to tell you anything about myself."},
	}

	for _, user := range users {
		err := db.Save(&user).Error
		if err != nil {
			fmt.Printf("Error when create users: %s\n", user.Username)
		} else {
			fmt.Printf("Sucess create roles: %s\n", user.Username)
		}
	}
}
