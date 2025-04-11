Comments - Frontend Implementation

This set of Frontend functions manages user-made comments. Users can create, fetch, and delete their own comments.

Tech Stack:
Frontend: React
Backend: Go

Environement Variable:

```jsx
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

===============================================================

getComments(token, post_id) - fetches all comments on a specified post

Method: GET
Endpoint: ${BACKEND_URL}/comments/post/${post_id}
Headers:

- Authorization: Bearer: <token>

Response Status: 200

Returns: An array of all comments on the specified post

Error HAndling: "Unable to fetch comments"

===============================================================

createComment(totken, post_id, content) - create a comment associated with a specific post

Method: POST
Endpoint: ${BACKEND_URL}/comments
Headers:

- Authorization: Bearer: <token>
- Content-Type: application/json

Body:

```json
{
  "content": "But what about a female duck?"
}
```

Response Status: 201

Returns: Newly created comment object

Error Handling: "Error creating comment"

===============================================================

deleteComment(token, comment_id) - deletes specified comment

Method: DELETE
Endpoint: ${BACKEND_URL}/comments/{comment_id}

Response Status: 200

Returns: Confirmartion of deleted comment object

Error Handling: "Unable to delete comment"
