# POST /comments

This endpoint allows users to create a comment on a post.

## Request

### URL

```
POST /comments
```

### Required Headers

```
Authorization: "bearer {JWT token}"
Content-Type: "application/json"
```

### Request Body

```json
{
    "content": "This is a comment",
    "post_id": 1
}
```

| Parameter | Type   | Description                              |
|-----------|--------|------------------------------------------|
| content   | string | The content of the comment to be created |
| post_id   | uint   | The ID of the post to comment on         |

## Response

### Success Response (201 Created)

Returns a JSON object with a success message and a new JWT token when a comment is successfully created.

```json
{
    "message": "Comment created",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

#### 400 Bad Request

If the request body is invalid, missing required fields, or the comment content is empty.

```json
{
    "message": "Invalid request body"
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

If there's a server-side error.

```json
{
    "err": "Something went wrong"
}
```

## Notes

- This endpoint requires authentication via a JWT token (as shown in the required headers section).
- The comment is associated with the post specified by the `post_id`.
- A new JWT token is returned with each successful response for token refresh purposes.