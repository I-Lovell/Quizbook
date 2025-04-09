# POST /posts

This endpoint creates a new post for the currently authenticated user.

## Use Case

This endpoint is used when a user wants to create a new post with a question and an answer.

---

## Request

### URL

`POST /posts`

### Required Headers

- Authorization: `bearer {JWT token}`
- Content-Type: `application/json`

### Request Body

The request body should be a JSON object containing the `question` and `answer` for the new post.

#### Example

```json
{
    "question": "What is the capital of France?",
    "answer": "Paris"
}
```

#### Fields

- **question** (string): The question for the post (must not be empty).
- **answer** (string): The answer to the question.

---

## Response

### Success Response (201 Created)

Returns a JSON object confirming that the post was created and includes a new JWT token.

#### Example

```json
{
    "message": "Post created",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

#### 400 Bad Request

Returned if the request body is invalid or the `question` field is empty.

```json
{
    "message": "Post question empty"
}
```

#### 401 Unauthorized

Returned if the JWT token is missing or invalid.

```json
{
    "message": "Unauthorized"
}
```

#### 500 Internal Server Error

Returned if there’s a server-side error while creating the post.

```json
{
    "err": "Something went wrong"
}
```

---

## Notes

- The endpoint requires authentication via a JWT token.
- The `userID` is extracted from the JWT token to associate the post with the authenticated user.
- A new JWT token is returned with each successful response for token refresh purposes.
- The `question` field must be non-empty; otherwise, a `400 Bad Request` error will be returned.
