import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { getPostsByUserID } from "../../services/posts";
import { getProfileByID } from "../../services/profile";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import Post from "../../components/Post/Post";
import "./ProfilePage.css";
import "../Background.css";
import "../Feed/FeedPage.css";

export const OtherUserProfilePage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  const { token, logout } = useCurrentUser();
  const { user_id } = useParams();

  useEffect(() => {
    if (!token) return navigate("/login");

    getProfileByID(user_id, token)
      .then((data) => {
        if (!data.user) {
          console.error("User not found");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });

    getPostsByUserID(user_id, token)
      .then((data) => {
        let sortedPosts = data.posts.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });
        setUserPosts(sortedPosts);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [token, user_id, navigate]);

  const logOutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-page-layout">
    <div className="backim"></div>
    <div className="profile-content">
      <div className="profile-left">
      <h1>Hello!</h1>
      </div>
    </div>
  </div>
  );
};

export default OtherUserProfilePage;
