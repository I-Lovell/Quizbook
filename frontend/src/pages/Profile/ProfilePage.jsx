import { useState } from "react";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import "./ProfilePage.css";
import "../Background.css";
import ProfileForm from "../../components/Post/ProfileForm";
import ProfileDetails from "../../components/Post/ProfileDetails";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { token, logout } = useCurrentUser();
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
          <p>This is where user posts will go.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
