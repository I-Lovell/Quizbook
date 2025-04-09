# GET /posts/:id

Retrieve a single post by its unique ID.

## Use Case

This endpoint is used when a user wants to view a specific post by its ID.

---

## Request

### URL

```
GET /posts/:id
```

- **:id** (path parameter): The unique identifier of the post to retrieve.

### Required Headers

```
Authorization: "bearer {JWT token}"
```

### Example URL

```
GET /posts/123
```

This would fetch the post with ID `123`.

---

## Response

### Success Response (200 OK)

Returns a JSON object containing the post details, including its associated comments and likes.

```json
{
    "post": {
        "id": 123,
        "question": "What is the capital of France?",
        "answer": "Paris",
        "user_id": 1,
        "username": "john_doe",
        "comments": [
            {
                "userID": 2,
                "username": "alice_smith",
                "contents": "Great post!"
            }
        ],
        "numOfLikes": 5,
        "created_at": "2025-04-09T12:34:56Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

#### 400 Bad Request

If the `id` path parameter is not a valid number.

```json
{
    "message": "Invalid post ID"
}
```

#### 404 Not Found

If no post with the specified ID is found.

```json
{
    "message": "Post not found"
}
```

#### 401 Unauthorized

If the JWT token is missing or invalid.

```json
{
    "message": "Unauthorized"
}
```

#### 500 Internal Server Error

If there’s a server-side error while fetching the post.

```json
{
    "err": "Something went wrong"
}
```

---

## Notes

- Authentication via JWT token is required to access the post details.
- The `userID` is extracted from the JWT token for authentication and may be used to determine if the user has access to the post.
- The response includes the post details, its associated comments, the number of likes, and the username of the post author.
- A new JWT token is returned with each successful response for token refresh purposes.

