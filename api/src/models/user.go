package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username          string `json:"username" gorm:"uniqueIndex;size:50"`
	Email             string `json:"email" gorm:"uniqueIndex;size:255"`
	Password          string `json:"password"`
	FirstName         string `json:"firstName" gorm:"size:50"`
	Surname           string `json:"surname" gorm:"size:50"`
	Bio               string `json:"bio"`
	ProfilePictureURL string `json:"profile_picture_url" gorm:"size:255"`
	Posts             []Post
	Comments          []Comment
	Likes             []Like
}

func (user *User) Save() (*User, error) {
	err := Database.Create(user).Error
	if err != nil {
		return &User{}, err
	}

	return user, nil
}

func FindUser(id string) (*User, error) {
	var user User
	err := Database.Where("id = ?", id).First(&user).Error

	if err != nil {
		return &User{}, err
	}

	return &user, nil
}

func FindUserByEmail(email string) (*User, error) {
	var user User
	err := Database.Where("email = ?", email).First(&user).Error

	if err != nil {
		return &User{}, err
	}

	return &user, nil
}
