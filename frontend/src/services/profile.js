// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getSelf = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch profile");
  }

  const data = await response.json();
  return data;
};

export const PostBio = async (token, bio) => {
  const payload = {
    bio: bio,
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status === 201) {
    return;
  } else {
    throw new Error(
      `Received status ${response.status} when posting bio. Expected 201`
    );
  }
};

export const PostProfilePicture = async (token, profilePictureURL) => {
  const payload = {
    profilePicture: profilePictureURL,
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status === 201) {
    return;
  } else {
    throw new Error(
      `Received status ${response.status} when posting photo. Expected 201`
    );
  }
};

export const updateProfile = async (updates, token) => {
  const requestOptions = {
    method: "PUT", //PATCH?
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 200) {
    throw new Error(
      `Received status ${response.status} when updating profile. Expected 200`
    );
  }
};
