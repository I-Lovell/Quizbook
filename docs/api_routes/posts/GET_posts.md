# GET /posts

This endpoint retrieves all posts in the system.

## Request

### URL
```
GET /posts
```

### Required Headers
```
Authorization: "bearer {JWT token}"
Content-Type: "application/json"
```

## Response

### Success Response (200 OK)
Returns a JSON object containing an array of all posts and a new JWT token.

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
      "liked": true
    },
    {
      "_id": 2,
      "question": "Another question",
      "answer": "Another answer",
      "user_id": 2,
      "username": "abbie",
      "comments": [
        {
          "userID": 5,
          "username": "imogen",
          "contents": "this is a comment"
        },
        {
          "userID": 3,
          "username": "emily",
          "contents": "this is another comment"
        }
      ],
      "numOfLikes": 4,
      "liked": false
    }
  ],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

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
- The endpoint requires authentication vai the JWT token (as shown in the required headers section)
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
- A new JWT token is returned with each successful response for token refresh purposes, which can be used on future requests
- The endpoint includes all posts in the system, regardless of which user created them 