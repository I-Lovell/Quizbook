# POST /users

Create a new user by providing a JSON object with user details.

## Request

### URL

`POST /users`

### Request Body

```json
{
    "email": "string",
    "password": "string",
    "username": "string",
    "firstName": "string",
    "surname": "string",
    "bio": "string",
    "profilePicture": "string (optional)"
}
```

### Request Parameters

- **email** (required): The email of the user.
- **password** (required): The password of the user.
- **username** (required): The username of the user.
- **firstName** (optional): The first name of the user.
- **surname** (optional): The surname of the user.
- **bio** (optional): A short biography for the user.
- **profilePicture** (optional): A base64 encoded string representing the user's profile picture.

### Example Request Body

```json
{
    "email": "john.doe@example.com",
    "password": "strongpassword123",
    "username": "john_doe",
    "firstName": "John",
    "surname": "Doe",
    "bio": "Software developer and tech enthusiast.",
    "profilePicture": "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA..."
}
```

## Response

### Success Response (201 Created)

If the user is successfully created, the API will return a `201 Created` status with a success message.

```json
{
    "message": "OK"
}
```

### Error Responses

- **400 Bad Request**: Missing required fields or invalid data.

    ```json
    {
        "message": "Must supply username and password"
    }
    ```

- **409 Conflict**: A user with the same email or username already exists.

    ```json
    {
        "message": "Email or username already taken"
    }
    ```

- **500 Internal Server Error**: Server-side error while saving the user.

    ```json
    {
        "message": "Something went wrong"
    }
    ```

## Notes

- The `profilePicture` is optional. If provided, it must be a valid base64 encoded string (e.g., `data:image/png;base64,...`).
- Uploaded profile pictures are saved in the `uploads/profile_pictures` directory, and the database stores only the URL of the image.
- Passwords are hashed before being saved in the database.
- If the email or username is already taken, the API returns a `409 Conflict` error.
- The user is not logged in after account creation, so no authentication token is returned.

