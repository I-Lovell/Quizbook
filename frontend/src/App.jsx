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
import { SinglePost } from "./pages/SinglePost/SinglePost";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";

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
  { 
    path: "/posts/:post_id",
    element: <SinglePost />,
  },
  {
    path: "*", 
    element: <NotFoundPage />, // Render the custom 404 page for invalid routes
  },
]);

const App = () => {
  return (
    <>
      <CurrentUserProvider>
        <RouterProvider router={router} />
      </CurrentUserProvider>
    </>
  );
};

export default App;
