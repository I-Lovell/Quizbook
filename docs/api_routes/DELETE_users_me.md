# DELETE /users/me

## Description
This endpoint allows the currently logged-in user to delete their account. The operation is permanent and will remove all associated data (e.g., posts, comments) from the database.

## Authentication
This route requires authentication. The user must include a valid JWT (JSON Web Token) in the `Authorization` header as a Bearer token.

## Request

### HTTP Method and URL
```http
DELETE /users/me
```

### Headers
| Header           | Type   | Description                          |
|-------------------|--------|--------------------------------------|
| Authorization     | String | Bearer token (valid JWT required).  |

## Response

### Success Response (200 OK)
If the request is successful, the API will return a `200 OK` status with the following response body:

```json
{
  "message": "User deleted successfully"
}
```

### Error Responses
| Status Code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| 401         | Unauthorized: The user is not authenticated or the token is invalid.       |
| 400         | Bad Request: The request is malformed or missing a valid token.            |
| 500         | Internal Server Error: An issue occurred while deleting the user's data.   |

#### Example Error Response (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

#### Example Error Response (500 Internal Server Error)
```json
{
  "message": "Failed to delete user"
}
```

#### Example Error Response (400 Bad Request)
```json
{
  "message": "Bad request"
}
```

## Notes
- The `Authorization` header must contain a valid JWT (Bearer token) identifying the currently logged-in user.
- Once the account is deleted, the user will no longer be able to log in using the same credentials.
- Ensure that the user understands this operation is irreversible.
- Use this endpoint with caution as it permanently deletes the user's account and associated data.