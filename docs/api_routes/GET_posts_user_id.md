# GET /posts/user/:ID

This endpoint retrieves all posts created by a specific user.

The intended usecase for the endpoint is:
- When visiting X user's profile, we'll be able to use this endpoint to display ONLY X user's posts.

## Request

### URL
```
GET /posts/user/:ID
```
where `:ID` is the numeric ID of the user whose posts you want to retrieve.

For example, `GET /posts/user/3` to retreive all of user 3's posts. 

### Required Headers
```
Authorization: "bearer {JWT token}"
Content-Type: "application/json"
```

## Response

### Success Response (200 OK)
Returns a JSON object containing an array of posts and a new JWT token.

```json
{
  "posts": [
    {
      "_id": 1,
      "question": "This is a test question",
      "answer": "test answer from bobio",
      "user_id": 1,
      "username": "bobsmith",
      "comments": [
        {
          "userID": 2,
          "username": "luke",
          "contents": "this is a comment"
        },
        {
          "userID": 3,
          "username": "abbie",
          "contents": "this is another comment"
        }
      ],
      "numOfLikes": 3,
      "liked": false
    }
  ],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

- **400 Bad Request**: If the user ID is invalid (i.e. GET posts/user/Z)
  ```json
  {
    "message": "Invalid user ID"
  }
  ```

- **401 Unauthorized**: If the JWT token is missing or invalid
  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **500 Internal Server Error**: If there's a server-side error
  ```json
  {
    "err": "Something went wrong"
  }
  ```

## Notes
- The endpoint requires authentication via JWT token
- Each post includes:
  - `_id`: The unique identifier of the post
  - `question`: The question text
  - `answer`: The answer text
  - `user_id`: The ID of the user who created the post
  - `username`: The username of the user who created the post
  - `comments`: An array of comments on the post, each with:
    - `userID`: The ID of the user who made the comment
    - `username`: The username of the user who made the comment
    - `contents`: The content of the comment
  - `numOfLikes`: The number of likes the post has received
  - `liked`: Boolean indicating whether the current authenticated user has liked this post
- A new JWT token is returned with each successful response for token refresh purposes 