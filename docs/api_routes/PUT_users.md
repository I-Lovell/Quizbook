# PUT /users

This endpoint updates the details of the currently authenticated user.

The intended use case for the endpoint is:
- When a user wants to update their profile information

## Request

### URL
```
PUT /users
```

### Required Headers
```
Authorization: "bearer {JWT token}"
Content-Type: "application/json"
```

### Request Body
The request body should be a JSON object containing the fields to be updated. For example:
```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

The above is just an example. Any of the fields in the USER table can be updated using the above syntax (for example, username could be updated etc)

## Response

### Success Response (200 OK)
Returns a JSON object containing the updated user details and a new JWT token.

```json
{
  "user": {
    "id": 1,
    "username": "newusername",
    "email": "newemail@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

- **400 Bad Request**: If the request body is invalid
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
- The endpoint requires authentication via JWT token
- The user is identified from the JWT token in the Authorization header
- Only the fields provided in the request body will be updated
- A new JWT token is returned with each successful response for token refresh purposes 