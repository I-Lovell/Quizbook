import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getSelf } from "../services/profile";

// This context is used to manage the current user state and provide it to the rest of the app without having to use a prop each time
const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchUserData = useCallback(async (authToken) => {
    if (!authToken) return;

    try {
      const data = await getSelf(authToken);
      setCurrentUser(data.user);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      const savedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (savedUser) {
        setCurrentUser(savedUser);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    } else {
      const savedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (savedUser) {
        setCurrentUser(savedUser);
      }
    }
  }, [token, fetchUserData]);

  useEffect(() => {
  }, [currentUser]);

  const login = useCallback((newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setToken(null);
    setCurrentUser(null);
  }, []);

  const updateCurrentUser = useCallback((updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        updateCurrentUser,
        login,
        logout,
        token,
        refreshUser: () => fetchUserData(token),
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};

export const getCurrentUserId = (token) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser && currentUser.user_id) {
    return currentUser.user_id;
  }

  console.error("No current user found in localStorage.");
  return null;
};
