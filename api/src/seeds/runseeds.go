package seeds

import (
	seeds "github.com/makersacademy/go-react-acebook-template/api/src/seeds/users"
	"gorm.io/gorm"
)

func SeedDatabase(db *gorm.DB)  {
	seeds.UserSeeds(db)
}