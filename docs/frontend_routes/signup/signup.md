User sign-up - Frontend Implementation

The frontend component of the sign-up process is responsible for sending a new user's data to the backend.

Tech Stack:
Frontend: React
Backend: Go

Environment Variable

```jsx
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

Signup (username, email, password):
Method: Post
Endpoint: ${BACKEND_URL}/users
Headers: Content-Type: application/json
Body:

```json
{
"username": "Ducky"
"email": "duck@example.com",
"password": "securePasswordForDucks123",
}
```

Success Response:
201

Error Handling:
Email Already Exists: "This email is associated with an existing account. Try signing in."
Username Already Taken: "Username is taken. Please try another name."
Other Errors: "Recieved Status code <code> when signing up. Expected 201"
