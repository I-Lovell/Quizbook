package models_tests

import (
	"os"
	"testing"

	"github.com/joho/godotenv"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/makersacademy/go-react-acebook-template/api/src/seeds"
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
)

func TestMain(m *testing.M) {
	// Load environment variables from .env file
	err := godotenv.Load(".test.env") // Load the .test.env file to set up environment variables for testing
	if err != nil {
		panic("Error loading .test.env file") // Panic if the .test.env file cannot be loaded
	}

	// Open a connection to the database
	models.OpenDatabaseConnection() // Initialize the database connection

	// Automatically migrate database models
	models.AutoMigrateModels() // Ensure the database schema matches the models
	seeds.UserSeeds(models.Database) // Populate the database with initial test data for users
	seeds.PostSeeds(models.Database) // Populate the database with initial test data for posts
	// Seed the database with test data for comments
	seeds.CommentSeeds(models.Database) // Populate the database with initial test data for comments

	// Run the tests and capture the exit code
	code := m.Run() // Execute the tests and store the exit code

	// Exit the program with the captured exit code
	os.Exit(code) // Exit the test process with the appropriate status
}

func TestFetchCommentByPostID (t *testing.T) {
	postid := uint(1) // Define the post ID to fetch comments for
	comments, err := models.FetchCommentsByPostID(postid) // Fetch comments for the specified post ID
	require.NoError(t, err) // Assert that there was no error during the fetch
	assert.NotEmpty(t, *comments) // Assert that the comments slice is not empty
	for _, comment := range *comments { // Iterate over the fetched comments
		assert.Equal(t, postid, comment.PostID) // Assert that each comment belongs to the specified post ID
	}
}


func TestFetchCommentByID(t *testing.T) {
	// Create a fresh test comment
	comment := &models.Comment{
		Content: "Testing comment fetch by ID", // Set the content of the test comment
		PostID:  1, // Specify the post ID this comment belongs to (must exist in the database)
		UserID:  1, // Specify the user ID who created this comment (must exist in the database)
	}

	// Save the test comment to the database
	savedComment, err := comment.Save() // Call the Save method to persist the comment - also tests the SAVE method here
	require.NoError(t, err) // Ensure there was no error while saving the comment

	// Now test FetchCommentByID
	fetched, err := models.FetchCommentByID(savedComment.ID) // Fetch the comment by its ID
	require.NoError(t, err) // Ensure there was no error while fetching the comment

	// Assert that the fetched comment matches the saved comment
	assert.Equal(t, savedComment.ID, fetched.ID) // Verify the IDs match
	assert.Equal(t, savedComment.Content, fetched.Content) // Verify the content matches
}

func TestDeleteCommentByID(t *testing.T) {
	// Create a fresh test comment
	comment := &models.Comment{
		Content: "Testing comment deletion", // Set the content of the test comment
		PostID:  1, // Specify the post ID this comment belongs to (must exist in the database)
		UserID:  1, // Specify the user ID who created this comment (must exist in the database)
	}
	// Save the test comment to the database
	savedComment, err := comment.Save() // Call the Save method to persist the comment - also tests the SAVE method here
	require.NoError(t, err) // Ensure there was no error while saving the comment

	// Now test DeleteCommentByID
	err = models.DeleteCommentByID(savedComment.ID) // Attempt to delete the comment by its ID
	require.NoError(t, err) // Ensure there was no error while deleting the comment

	// Try to fetch the deleted comment
	fetched, err := models.FetchCommentByID(savedComment.ID) // Attempt to fetch the comment again
	require.Error(t, err) // Ensure there WAS an error while fetching the deleted comment (cause it should not exist)
	assert.Equal(t, uint(0), fetched.ID) // Assert that the fetched comment ID is 0 (indicating it was not found)
}