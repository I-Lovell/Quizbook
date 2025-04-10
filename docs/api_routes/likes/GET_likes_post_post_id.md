# GET /likes/post/:post_id

Retrieve all likes for a specific post identified by `post_id`.

## Request

### URL
```
GET /likes/post/:post_id
```

### Path Parameters
- `post_id` (required): The unique identifier of the post whose likes you want to retrieve.

### Authentication
This endpoint requires authentication. Include a valid JWT (JSON Web Token) in the `Authorization` header as a Bearer token.

## Example Request
```
GET /likes/post/123
Authorization: Bearer <your-jwt-token>
```

## Response

### Success Response (200 OK)
If the request is successful, the API returns a `200 OK` status and a JSON object containing the likes for the specified post.

#### Response Body
```json
{
    "likes": [
        {
            "_id": 1,
            "user_id": 42,
            "post_id": 123
        },
        {
            "_id": 2,
            "user_id": 44,
            "post_id": 123
        }
    ],
    "token": "<generated-jwt-token>"
}
```

- `likes`: An array of objects representing the likes for the post. Each like contains:
    - `_id`: The unique identifier for the like.
    - `user_id`: The ID of the user who liked the post.
    - `post_id`: The ID of the post that was liked.
- `token`: A new JWT token for the authenticated user (used to maintain the session).

### Error Responses

#### 400 Bad Request
If the `post_id` is invalid or cannot be parsed to a valid integer.
```json
{
    "message": "Invalid post ID"
}
```

#### 401 Unauthorized
If the user is not authenticated or the token is invalid.
```json
{
    "message": "Unauthorized"
}
```

#### 500 Internal Server Error
If an unexpected error occurs during request processing (e.g., database issues).
```json
{
    "message": "Internal Server Error"
}
```

## Notes
- The `Authorization` header must contain a valid JWT (Bearer token) identifying the currently logged-in user.
- This endpoint retrieves all likes for a particular post, including the `user_id` of users who liked the post and the `post_id`.
- The response includes a refreshed JWT token to help maintain the user's session.