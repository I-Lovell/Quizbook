import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import {  useCurrentUser } from "../../contexts/CurrentUserContext";
import { getPostsByUserID } from "../../services/posts";
import { getProfileByUserID, getSelf } from "../../services/profile";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import Post from "../../components/Post/Post";
import "./ProfilePage.css";
import "../Background.css";
import "../Feed/FeedPage.css";

export const OtherUsersProfilePage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [userProfileData, setProfileData] = useState([]);
  const [currentUserID, setCurrentUserID] = useState(null);
  const navigate = useNavigate();
  const { token, logout } = useCurrentUser();
  const { user_id } = useParams();

  useEffect(() => {
    if (!token) return navigate("/login");

    getSelf(token)
      .then((data) => {
        const currentUserData = data.user;
        const currentUserID = currentUserData.ID;
        localStorage.setItem("currentUser", JSON.stringify(currentUserData));
        setCurrentUserID(currentUserID);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });

    getProfileByUserID(user_id, token)
      .then((rawProfileData) => {
        if (!rawProfileData.message === "User ID not found") {
          console.error("User not found");
          navigate("/posts");
        }
        const profileData = rawProfileData.user;
        setProfileData(profileData);
        if (profileData.ID == currentUserID) {
          navigate("/profile/me");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/posts");
      });

    getPostsByUserID(user_id, token)
      .then((postsData) => {
        let sortedPosts = postsData.posts.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });
        setUserPosts(sortedPosts);
      })
      .catch((err) => {
        console.error(err);
        navigate("/posts");
      });
  }, [token, user_id, navigate]);

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
          <div className="profile-picture-container">
            <div className="profilePicture">
              <div className="profile-picture-wrapper">
                <img
                  src={
                    userProfileData?.profilePicture ||
                    "https://img.freepik.com/free-psd/cartoon-question-mark-isolated_23-2151568563.jpg?semt=ais_hybrid"
                  }
                  alt="Profile"
                  className="profile-picture"
                />
              </div>
            </div>
          </div>
          <h2 className="username">
            {userProfileData?.username || "No username"}
          </h2>
        <p className="bio">
        {userProfileData?.bio || "This user has no bio."}
        </p>        

        </div>
        <div className="vertical-line"></div>
        <div className="profile-right">
          <h3>Your Posts</h3>
          {userPosts.length === 0 ? (
            <p>This user hasn’t posted anything yet.</p>
          ) : (
            <div className="feed" role="feed">
              {userPosts.map((post) => (
                <Post post={post} key={post._id} hideUsername={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherUsersProfilePage;

// IF USER_ID  === CURRENT_USER_ID, REDIRECT TO "/PROFILE/ME"
