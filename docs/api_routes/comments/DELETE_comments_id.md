# DELETE /comments/:id

## Description
This endpoint allows users to delete their own comments. Only the comment owner can delete their comment.

## Authentication
This route requires authentication. The user must include a valid JWT (JSON Web Token) in the `Authorization` header as a Bearer token.

## Request

### HTTP Method and URL
```http
DELETE /comments/:id
```

### URL Parameters
| Parameter | Type | Description                  |
|-----------|------|------------------------------|
| id        | uint | The ID of the comment to delete |

### Headers
| Header           | Type   | Description                          |
|------------------|--------|--------------------------------------|
| Authorization    | String | Bearer token (valid JWT required).   |

## Response

### Success Response (200 OK)
If the request is successful, the API will return a `200 OK` status with the following response body:

```json
{
  "message": "Comment deleted successfully"
}
```

### Error Responses
| Status Code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| 400         | Bad Request: Invalid comment ID format.                                     |
| 401         | Unauthorized: The user is not authenticated or the token is invalid.        |
| 403         | Forbidden: The user is not the owner of the comment.                        |
| 404         | Not Found: The specified comment could not be found.                        |
| 500         | Internal Server Error: An issue occurred while deleting the comment.        |

#### Example Error Response (400 Bad Request)
```json
{
  "message": "Invalid comment ID"
}
```

#### Example Error Response (401 Unauthorized)
```json
{
  "message": "Unauthorised"
}
```

#### Example Error Response (403 Forbidden)
```json
{
  "message": "You are not authorised to delete this comment"
}
```

#### Example Error Response (404 Not Found)
```json
{
  "message": "Comment not found"
}
```

#### Example Error Response (500 Internal Server Error)
```json
{
  "err": "Something went wrong"
}
```

## Notes
- The `Authorization` header must contain a valid JWT (Bearer token).
- Only the original author of the comment can delete it.
- The operation is permanent and cannot be undone.
- The comment ID in the URL must be a valid numeric identifier. 