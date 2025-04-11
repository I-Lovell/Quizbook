User Login - Frontend Implementation

The frontend component of the login process is responsible for authenticating the user's credentials by sending them to the backend. If the information is valid, the backend returns a token for future authentication requests.

Tech Stack:
Frontend: React
Backend: Go

Environment Variable

```jsx
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

Login (email, password):
Method: Post
Endpoint: ${BACKEND_URL}/users
Headers: Content-Type: application/json
Body:

```json
{
  "email": "duck@example.com",
  "password": "securePasswordForDucks123"
}
```

Success Response:
201

```json
{
    "token": "<JWT token string>"
}

Error Handling:
Invalid Credientials: "Invalid email or password"
Any other error: "Invalid email or password"
```
