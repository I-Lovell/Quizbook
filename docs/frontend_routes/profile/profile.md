User Profile - Frontend Implementation

These frontend functions interact with the user profile endpoints of the backend. They fetch the current user's profile, retrieve another user's profile, update the logged in user's own profile, and allow a user to delete their own account.

Tech Stack:
Frontend: React
Backend: Go

Environment Variable

```jsx
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

===============================================================

getSelf(token) - Fetches the current user's profile

Method: GET
Endpoint: ${BACKEND_URL}/users/me
Headers:

- Authorization: Bearer <token>

Success Response: 200

Error Handling: "Unable to fetch profile"

===============================================================

getProfileByUserID(user_id, token) - fetches another user's profile by their ID.

Method: GET
Endpoint: ${BACKEND_URL}/users/:user_id
Headers:

- Authorization: Bearer <token>

Success Response: 200

Returns: user profile object

Error Handling: "Unable to fetch profile with ID: <user_id>"

===============================================================

updateProfile(updates, token) - sends updated profile info to backend for logged in user.

Method: PUT
Endpoint: ${BACKEND_URL}/users
Headers:

- Content-Type: Application/json
- Authorization: Bearer <token>
  Body:

```json
{
  "bio": "I'm just a simple duck who loves quizzes!",
  "profilePicture": "data:image/png;base64, iVBORw0KGgGHDURGGJSOIUYYYA..."
}
```

Success Response: 201

Error Handling: "Recieved status ${response.status} when updating profile. Expected 201"

===============================================================

deleteProfile(token) - deletes the logged in users Account

Method: DELETE
Endpoint: Endpoint: ${BACKEND_URL}/users/me
Headers:

- Content-type: application/json

Success Response: 200

Error Handling: "Failed to delete profile"
