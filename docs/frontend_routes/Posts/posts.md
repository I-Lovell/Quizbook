Posts - Frontend Implementation

This set of Frontend functions manages user-made posts. Users can create, view, update, and delete their own posts, and view the posts of others.

Tech Stack:
Frontend: React
Backend: Go

Environment Variable:

```jsx
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

===============================================================

getPosts(token) - fetches all posts from backend

Method: GET
Endpoint: ${BACKEND_URL}/posts
Headers:

- Authorization: Bearer <token>

Response Status: 200

Returns: An array of post objects

Error Handling: "Unable to fetch posts"

===============================================================

fetchSelfPosts(token) - fetches the posts made by the currently logged-in user for display on their own Profile Page

Method: GET
Endpoint: ${BACKEND_URL}/posts/self
Headers:

- Authorization: Bearer: <token>

  Body:

```json
{
  "question": "What is a male duck known as?",
  "answer": "A Drake"
}
```

Response Status: 200

Returns: An array of post objects created by currentUser

Error Handling: "Unable to fetch posts"

===============================================================

createPost(token, question, answer) - creates a new post with a mandatory question and answer field

Method: POST
Endpoint: ${BACKEND_URL}/posts
Headers:

- Authorization: Bearer: <token>
- Content-Type: application/json

Response Status: 201

Returns: New Object

Error Handling: "Unable to create post"

===============================================================

getPostByID(token, post_id) - fetches a single post by post ID

Method: GET
Endpoint: ${BACKEND_URL}/posts/${post_id}
Headers:

- Authorization: Bearer: <token>

Response Status: 200

Returns: Post Object

Error HAndling: 404 "Post not found"

===============================================================

deletePost(token, post_id) - deletes post by ID, requires user to be signed in and can only delete own post

Method: DELETE
Endpoint: ${BACKEND_URL}/posts/${post_id}
Headers:

- Authorization: Bearer: <token>

Response Status: 200

Returns: confirmation object

Error Handling: "Unable to delete post"

===============================================================

updatePost(token, post_id, question, answer) - updates a post's content, requires fields

Method: PUT
Endpoint: ${BACKEND_URL}/posts/${post_id}
Headers:

- Authorization: Bearer: <token>
- Content-Type: application/json
  Body:

```json
{
  "question": "What is the correct term for a male duck?",
  "answer": "a drake"
}
```

Response Status: 200

Returns: Updated post object

Error Handling: "Unable to update post"

===============================================================

getPostsByUserID(user_id, token) - gets the posts for a specific user to be displayed on other users' profiles.

Method: GET
Endpoint: ${BACKEND_URL}/posts/${user_id}
Headers:

- Authorization: Bearer: <token>

Response Status: 200

Returns: Array of post objects by specified user_id

Error Handling: "Unable to fetch posts"
