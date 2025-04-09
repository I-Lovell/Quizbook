# POST /tokens

Authenticate a user using their email and password to generate a JWT (JSON Web Token). This token is required for authenticating future requests.

## Request

### URL

`POST /tokens`

### Request Body

The request body must include the user's email and password.

#### Example

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

- **email** (required): The email address associated with the user's account.
- **password** (required): The password of the user.

### Authentication

No authentication is required to access this route. It is used to log in a user and generate a new token.

## Response

### Success Response (201 Created)

If authentication is successful, the API returns a `201 Created` status and a JSON object containing the generated JWT token.

#### Example Response Body

```json
{
    "token": "<generated-jwt-token>",
    "message": "OK"
}
```

- **token**: The JWT token generated for the authenticated user. Include this token in the `Authorization` header as a Bearer token in subsequent requests.
- **message**: A success message indicating the operation was successful.

### Error Responses

#### 400 Bad Request

Occurs if the request body is missing, malformed, or if required fields (email or password) are not provided.

#### Example

```json
{
    "message": "Key: 'CreateTokenRequestBody.Email' Error:Field validation for 'Email' failed on the 'required' tag"
}
```

#### 401 Unauthorized

Occurs if the email or password is incorrect or does not match the records in the database.

#### Example

```json
{
    "message": "Password incorrect"
}
```

#### 500 Internal Server Error

Occurs if an unexpected error happens (e.g., database issues, token generation failure).

#### Example

```json
{
    "message": "Internal Server Error"
}
```

## Notes

- Both `email` and `password` are required to authenticate the user.
- If the credentials match a user in the database, a new JWT token is generated and returned.
- Use the returned token for accessing protected routes by including it in the `Authorization` header as a Bearer token.
- This endpoint does not require prior authentication.
- The token is essential for accessing other protected routes.
