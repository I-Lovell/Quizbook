import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { SinglePost } from "./pages/SinglePost/SinglePost";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { OtherUsersProfilePage } from "./pages/Profile/OtherUsersProfilePage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

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
    path: "/posts/:post_id",
    element: <SinglePost />,
  },
  {
    path: "/profile/me",
    element: <ProfilePage />,
  },
  {
    path: "/profile/:user_id",
    element: <OtherUsersProfilePage />,
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
