import { useState, useEffect } from "react";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import "./ProfilePage.css";
import "../Background.css";
import ProfileForm from "../../components/Post/ProfileForm";
import ProfileDetails from "../../components/Post/ProfileDetails";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { fetchSelfPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import "../Feed/FeedPage.css";

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  const { token, logout } = useCurrentUser();

  useEffect(() => {
    if (!token) return navigate("/login");
    console.log(token);

    fetchSelfPosts(token)
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
  }, [token, navigate]);

  const logOutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-page-layout">
      <div className="backim"></div>
      <LoggedInHeader onLogout={logOutHandler} />
      <div className="profile-content">
        <div className="profile-left">
          {isEditing ? (
            <ProfileForm />
          ) : (
            <ProfileDetails toggleEdit={() => setIsEditing(true)} />
          )}
        </div>
        <div className="vertical-line"></div>
        <div className="profile-right">
          <h3>Your Posts</h3>
          {userPosts.length === 0 ? (
            <p>You haven’t posted anything yet.</p>
          ) : (
            <div className="feed" role="feed">
              {userPosts.map((post) => (
                <Post post={post} key={post._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
