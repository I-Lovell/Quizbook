// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();

  return data;
};

export const fetchSelfPosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/self`, requestOptions);

  if (response.status !== 200) {
    console.error("Error fetching posts:", response.status);
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  console.log("Fetched posts:", data);
  return data;
};

export const createPost = async (token, question, answer) => {
  const payload = {
    question: question,
    answer: answer,
  };
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to create post");
  }

  return response.json();
};

export const getSinglePostByID = async (token, post_id) => {
  if (!post_id) {
    console.error("Missing post_id parameter");
    throw new Error("Post ID is required");
  }

  console.log("Fetching post with ID:", post_id);
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/posts/${post_id}`,
      requestOptions
    );

    if (response.status === 404) {
      throw new Error("Post not found"); // Specific error for 404
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No error details");
      console.error("Error response:", errorText);
      throw new Error(
        `Failed to fetch post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const deletePost = async (token, post_id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/${post_id}`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to delete post");
  }

  return response.json();
}

export const updatePost = async (token, post_id, question, answer) => {
  const payload = {
    question: question,
    answer: answer,
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/posts/${post_id}`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to update post");
  }

  return response.json();
};


export const getPostsByUserID = async (user_id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BACKEND_URL}/posts/user/${user_id}`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
}

