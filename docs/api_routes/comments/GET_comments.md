# GET /comments/post/:post_id

Retrieve all comments for a specific post.

## Request

### URL
```
GET /comments/post/:post_id
```

### Required Headers
```
Authorization: "bearer {JWT token}"
```

### URL Parameters
| Parameter | Type | Description                          |
|-----------|------|--------------------------------------|
| post_id   | uint | The ID of the post to retrieve comments for |

## Response

### Success Response (200 OK)
Returns a JSON object with a list of comments associated with the specified post.

```json
{
    "comments": [
        {
            "_id": 1,
            "content": "This is a comment",
            "user_id": 2,
            "post_id": 1
        },
        {
            "_id": 2,
            "content": "Another comment",
            "user_id": 3,
            "post_id": 1
        }
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Fields
| Field    | Type   | Description                                      |
|----------|--------|--------------------------------------------------|
| _id      | uint   | The ID of the comment                            |
| content  | string | The content of the comment                       |
| user_id  | uint   | The ID of the user who created the comment       |
| post_id  | uint   | The ID of the post that the comment is related to |
| token    | string | A refreshed JWT token for authentication         |

### Error Responses

#### 400 Bad Request
If the `post_id` is invalid or missing.

```json
{
    "message": "Invalid post ID"
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
If there's a server-side error while fetching the comments.

```json
{
    "err": "Something went wrong"
}
```

## Notes
- This endpoint requires authentication via a JWT token (as shown in the required headers section).
- The `post_id` URL parameter is required to specify the post for which comments are being retrieved.
- The response will include the comments associated with the given post, and a new JWT token will be returned for token refresh purposes.

