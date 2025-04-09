# PUT /posts/:id

This endpoint updates a post by its ID. Only the owner of the post can update it.

The intended use case for the endpoint is:
- When a user wants to update their own post's content

## Request

### URL
```
PUT /posts/:id
```

Where `:id` is the ID of the post to update.

### Required Headers
```
Authorization: "bearer {JWT token}"
Content-Type: "application/json"
```

### Request Body
The request body should be a JSON object containing the fields to be updated. For example:
```json
{
  "question": "Updated question?",
  "answer": "Updated answer."
}
```

The above is just an example. Either of the above fields in the post can be included/excluded in the request (i.e. you don't have to incude both)

## Response

### Success Response (200 OK)
Returns a JSON object with a success message and a new JWT token.

```json
{
  "message": "Post updated successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

- **400 Bad Request**: If the request body is invalid or the post ID is invalid
  ```json
  {
    "message": "Invalid request body"
  }
  ```
  or
  ```json
  {
    "message": "Invalid post ID"
  }
  ```

- **401 Unauthorized**: If the JWT token is missing or invalid
  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **403 Forbidden**: If the user is not the owner of the post
  ```json
  {
    "message": "You can only update your own posts"
  }
  ```

- **404 Not Found**: If the post does not exist
  ```json
  {
    "message": "Post not found"
  }
  ```

- **500 Internal Server Error**: If there's a server-side error
  ```json
  {
    "err": "Something went wrong"
  }
  ```

## Notes
- This endpoint requires authentication via JWT token
- Only the owner of the post can update it
- Only the fields provided in the request body will be updated
- A new JWT token is returned with each successful response for token refresh purposes 