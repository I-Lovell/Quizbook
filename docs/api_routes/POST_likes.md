# POST /likes

This endpoint allows users to like or unlike a post, implementing a toggle functionality.

## Request

### URL
```
POST /likes
```

### Required Headers
```
Authorization: "bearer {JWT token}"
Content-Type: "application/json"
```

### Request Body
```json
{
  "post_id": 1
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| post_id   | uint | The ID of the post to like/unlike |

## Response

Please not that the response is different (201 and 200) depending on if the like was created or removed. I'm not sure if they is helpful for the frontend for keeping track of state?

### Success Response - Like Created (201 Created)
Returns a JSON object with a success message and a new JWT token when a like is created.

```json
{
  "message": "Like created",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Success Response - Like Removed (200 OK)
Returns a JSON object with a success message and a new JWT token when a like is removed.

```json
{
  "message": "Like removed",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

- **400 Bad Request**: If the request body is invalid or missing required fields
  ```json
  {
    "message": "Invalid request body"
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
- This endpoint requires authentication via a JWT token (as shown in the required headers section)
- The endpoint implements a toggle functionality:
  - If the user has not liked the post before, it creates a new like
  - If the user has already liked the post, it removes the existing like
      - This is technically done by GORM by just adding a date/time into the 'deleted_at' column in the database. But it's all the same. Any further requests to `GET /likes/post/:post_id` won't include these 'removed' rows.
- The behavior is determined automatically based on the current state in the database
- A new JWT token is returned with each successful response for token refresh purposes 