const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password) => {
  const payload = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/tokens`, requestOptions);

  if (response.status === 201) {
    let data = await response.json();
    return data.token;
  } else if (response.status === 401) {
    throw new Error("Invalid email or password");
  } else {
    throw new Error(`Invalid email or password`);
  }
};

export const signup = async (email, password, username) => {
  const payload = {
    email: email,
    password: password,
    username: username,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status === 201) {
    return;
  } else {
    const data = await response.json();
    if (data?.error?.includes("Email")) {
      throw new Error(
        "This email is associated with an existing account. Try signing in."
      );
    } else if (data?.error?.includes("Username")) {
      throw new Error("Username is taken. Please try another name.");
    } else {
      throw new Error(
        `Received status ${response.status} when signing up. Expected 201`
      );
    }
  }
};
