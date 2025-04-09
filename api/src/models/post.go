package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	UserID   uint      `json:"user_id" gorm:"constraint:OnDelete:CASCADE"`
	User     User      `json:"user"`
	Question string    `json:"question"`
	Answer   string    `json:"answer"`
	Comments []Comment `json:"comments"`
	Likes    []Like    `json:"likes"`
}

func (post *Post) Save() (*Post, error) {
	err := Database.Create(post).Error
	if err != nil {
		return &Post{}, err
	}

	return post, nil
}

func FetchAllPosts() (*[]Post, error) {
	var posts []Post
	err := Database.Find(&posts).Error

	if err != nil {
		return &[]Post{}, err
	}

	return &posts, nil
}

func FetchPostsByUserID(userID uint) (*[]Post, error) {
	var posts []Post
	err := Database.Where("user_id = ?", userID).Find(&posts).Error

	if err != nil {
		return &[]Post{}, err
	}

	return &posts, nil
}

func FetchPostByID(id uint) (*Post, error) {
	var post Post
	err := Database.First(&post, id).Error

	if err != nil {
		return &Post{}, err
	}

	return &post, nil
}


func DeletePost(id uint) error {
	var post Post

	// Find the post
	if err := Database.First(&post, id).Error; err != nil {
		return err
	}

	// Delete the post record from the database
	if err := Database.Delete(&post).Error; err != nil {
		return err
	}

	return nil
}