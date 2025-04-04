import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import { getSelf } from "./services/profile";

// What is this? Docs here: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/posts",
    element: <FeedPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCurrentUser(token);
      getSelf(token)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setCurrentUser(null);
        });
    }
  }, []);
  return (
    <>
      <CurrentUserProvider user={{ currentUser, setCurrentUser }}>
        <RouterProvider router={router} />
      </CurrentUserProvider>
    </>
  );
};

export default App;
