package seeds

import (
	"fmt"

	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"gorm.io/gorm"
)

func UserSeeds(db *gorm.DB) {
	//Example Users created below
	//We create instances of the user model all within a slice to iterate over later
	users := []models.User{
		{Username: "quizguy", Email: "quiz@email.com", Password: "ilovequiz", FirstName: "John", Surname: "Smith", Bio: "I love me a good pub quiz"},
		{Username: "CoolCat", Email: "cat@cat.com", Password: "mouse", FirstName: "Percival", Surname: "Green", Bio: "I am interested in cat based quizes"},
		{Username: "NoSoftQuestions", Email: "cynic@eyebrowraise.com", Password: "socrates1992", FirstName: "Lucy", Surname: "Stone", Bio: "No one has ever answered one of my questions correctly"},
		{Username: "CustardLover", Email: "custard@pudding.com", Password: "cake", FirstName: "Carol", Surname: "Harvester", Bio: "I only signed up because i thought this was a baking website"},
		{Username: "QuizzicalQuentin", Email: "quentin@email.com", Password: "p@ssword!", FirstName: "Quentin", Surname: "Quentin", Bio: "I don't have to tell you anything about myself."},
		{Username: "Test", Email: "test@gmail.com", Password: "123", FirstName: "Tilly", Surname: "Test", Bio: "This is the test profile"},
	}

	//Here we iterate over the slice of users, save each to a database and print
	//either a confirmation or error
	for _, user := range users {
		err := db.Save(&user).Error
		if err != nil {
			fmt.Printf("Error when create users: %s\n", user.Username)
		} else {
			fmt.Printf("Sucessfully created user: %s\n", user.Username)
		}
	}
}
