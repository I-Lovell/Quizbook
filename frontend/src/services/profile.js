// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getSelf = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users/me`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch profile");
  }

  const data = await response.json();
  return data;
};

export const updateProfile = async (updates, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 201) {
    throw new Error(
      `Received status ${response.status} when updating profile. Expected 201`
    );
  }
};

export const deleteProfile = async (token) => {
  const response = await fetch("https://your-api-url.com/users/me", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete profile");
  }

  return response.json();
};
