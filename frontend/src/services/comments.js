const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getComments = async (token, post_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BACKEND_URL}/comments/post/${post_id}`,
    requestOptions
  );

  if (response.status !== 200) {
    throw new Error("Unable to fetch comments");
  }

  const data = await response.json();

  return data;
};

export const createComment = async (token, post_id, content) => {
  const payload = {
    post_id: post_id,
    content: content,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/comments`, requestOptions);

  if (response.status !== 201) {
    console.error("Error creating comment:", response.status, responseBody);
    throw new Error("Unable to create comment");
  }

  return response.json();
};
