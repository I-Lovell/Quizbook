package models

import (
	"gorm.io/gorm"
)

type Like struct {
	gorm.Model
	PostID uint `json:"post_id"`
	UserID uint `json:"user_id"`
	Post   Post `json:"-"`
	User   User `json:"-"`
}

func (like *Like) Save() (*Like, error) {
	err := Database.Create(like).Error
	if err != nil {
		return &Like{}, err
	}
	return like, nil
}

func FetchLikesByPostID(postID uint) (*[]Like, error) {
	var likes []Like
	err := Database.Where("post_id = ?", postID).Find(&likes).Error
	if err != nil {
		return &[]Like{}, err
	}
	return &likes, nil
} 