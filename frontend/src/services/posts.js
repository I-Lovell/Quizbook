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
}

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
    const response = await fetch(`${BACKEND_URL}/posts/${post_id}`, requestOptions);
    // console.log("Response status:", response.status);
    
    if (response.status === 404) {
      throw new Error("Post not found"); // Specific error for 404
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No error details");
      console.error("Error response:", errorText);
      throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("Received data:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};