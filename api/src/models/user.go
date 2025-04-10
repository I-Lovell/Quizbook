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
	ProfilePictureURL string `json:"profilePicture" gorm:"size:255"`
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

func UpdateUser(id uint, updates map[string]interface{}) (*User, error) {
	var user User

	// First find the user
	if err := Database.First(&user, id).Error; err != nil {
		return nil, err
	}

	// Attempt to update the user in the database
	if err := Database.Model(&user).Updates(updates).Error; err != nil {
		return nil, err
	}

	// Refresh user data
	if err := Database.First(&user, id).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func DeleteUser(id uint) error {
	// Begin a transaction
	tx := Database.Begin()

	// Soft delete the user's posts first
	if err := tx.Where("user_id = ?", id).Delete(&Post{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Soft delete the user's likes
	if err := tx.Where("user_id = ?", id).Delete(&Like{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Then soft delete the user's comments
	if err := tx.Where("user_id = ?", id).Delete(&Comment{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Then soft delete the user
	if err := tx.Delete(&User{}, id).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Commit the transaction
	return tx.Commit().Error
}

// RestoreDeletedUser restores a soft-deleted user and their related content (posts, likes, comments)
func RestoreDeletedUser(email string) (*User, error) {
	// Begin a transaction
	tx := Database.Begin()

	// Find the soft-deleted user by email (with unscoped to see deleted records)
	var user User
	if err := tx.Unscoped().Where("email = ? AND deleted_at IS NOT NULL", email).First(&user).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Restore the user by clearing the DeletedAt field
	if err := tx.Unscoped().Model(&user).Update("deleted_at", nil).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Restore the user's posts
	if err := tx.Unscoped().Model(&Post{}).Where("user_id = ? AND deleted_at IS NOT NULL", user.ID).Update("deleted_at", nil).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Restore the user's likes
	if err := tx.Unscoped().Model(&Like{}).Where("user_id = ? AND deleted_at IS NOT NULL", user.ID).Update("deleted_at", nil).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Restore the user's comments
	if err := tx.Unscoped().Model(&Comment{}).Where("user_id = ? AND deleted_at IS NOT NULL", user.ID).Update("deleted_at", nil).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Commit the transaction
	if err := tx.Commit().Error; err != nil {
		return nil, err
	}

	// Return the restored user
	return &user, nil
}
