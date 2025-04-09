# GET /users/me

Retrieve the details of the currently logged-in user.

## Request

### URL
```
GET /users/me
```

### Authentication
This route requires authentication. Include a valid JWT (JSON Web Token) in the `Authorization` header as a Bearer token.

### Example Request
```http
GET /users/me
Authorization: Bearer <your-jwt-token>
```

---

## Response

### Success Response (200 OK)
If the request is successful, the API will return a `200 OK` status with the user's data.

#### Response Body
```json
{
    "user": {
        "ID": 1,
        "username": "john_doe",
        "email": "john.doe@example.com",
        "firstName": "John",
        "surname": "Doe",
        "bio": "Software developer and tech enthusiast.",
        "profilePicture": "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA...",
        "Posts": [],
        "Likes": [],
        "Comments": []
    },
    "token": "<new-jwt-token>"
}
```

#### Fields
- **user**: Contains the details of the logged-in user.
    - **ID**: The unique identifier of the user.
    - **username**: The user's username.
    - **email**: The user's email address.
    - **firstName**: The user's first name.
    - **surname**: The user's surname.
    - **bio**: The user's biography.
    - **profilePicture**: A base64-encoded string representing the user's profile picture (if available). If no profile picture exists, this field will be empty.
    - **Posts**: A list of posts created by the user (if applicable).
    - **Likes**: A list of posts liked by the user (if applicable).
    - **Comments**: A list of comments made by the user (if applicable).
- **token**: A new JWT token for the user (generated on each request). This token can be used for subsequent authenticated requests.

### Example Response
```json
{
    "user": {
        "ID": 1,
        "username": "john_doe",
        "email": "john.doe@example.com",
        "firstName": "John",
        "surname": "Doe",
        "bio": "Software developer and tech enthusiast.",
        "profilePicture": "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA...",
        "Posts": [],
        "Likes": [],
        "Comments": []
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNjE3Nzk3MzYxfQ.tPTMj1zHtE9bnVoCpIqXxS_bR6l79dYvh2_7Wq7OfYY"
}
```

---

### Error Responses

#### 401 Unauthorized
If the user is not authenticated or the token is invalid.
```json
{
    "message": "Unauthorized"
}
```

#### 500 Internal Server Error
If there is an issue while fetching the user's data from the database or an internal server error occurs.
```json
{
    "message": "Something went wrong"
}
```

---

## Notes
- The `Authorization` header must contain a valid JWT (Bearer token) that identifies the currently logged-in user.
- The `profilePicture` field will return a base64-encoded string representing the image. If the user does not have a profile picture, this field will be empty.
- The `token` in the response is a new JWT generated during the request and can be used for subsequent authenticated requests.
- This endpoint will not work if the user is not logged in or does not provide a valid JWT.

