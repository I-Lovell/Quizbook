package seeds

import (
	"gorm.io/gorm"
)

func SeedDatabase(db *gorm.DB)  {
	UserSeeds(db)
	PostSeeds(db)
}