Likes - Frontend Implementation

This set of Frontend functions manages the logic for likes on posts, toggle likes and retrieve number of likes

Tech Stack:
Frontend: React
Backend: Go

Environement Variable:

```jsx
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

===============================================================

createLike(token, post_id) - toggles a like, on if first time, off if already liked

Method: POST
Endpoint: ${BACKEND_URL}/likes
Headers:

- Authorization: Bearer: <token>

Response Status: 200 or 201

Returns: JSON response from backend ("Like created" or "Like removed")

Error Handling: "Unable to toggle like"

===============================================================

getLikes(token, post_id) - fetches numebr of likes

Method: GET
Endpoint: ${BACKEND_URL}/likes/post/{post_id}
Headers:

- Authorization: Bearer: <token>

Response Status: 200

Returns: Array of likes

Error Handling: "Unable to fetch likes"
