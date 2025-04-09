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

func UpdatePost(id uint, updates map[string]interface{}) (*Post, error) {
	var post Post

	// First find the post
	if err := Database.First(&post, id).Error; err != nil {
		return nil, err
	}

	// Attempt to update the post in the database
	if err := Database.Model(&post).Updates(updates).Error; err != nil {
		return nil, err
	}

	// Refresh post data
	if err := Database.First(&post, id).Error; err != nil {
		return nil, err
	}

	return &post, nil
}
