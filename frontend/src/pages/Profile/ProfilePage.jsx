import { useEffect, useRef, useState } from "react";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import ProfilePicture from "../../components/Post/ProfilePicture";
import Bio from "../../components/Post/Bio";
import "./ProfilePage.css";
import "../Background.css";
import { getSelf } from "../../services/profile";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

export const ProfilePage = () => {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getSelf(token)
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    console.log("Profile picture", formData);
  };

  return (
    <div className="home">
      <div className="backim"></div>
      <LoggedInHeader />
      <form
        ref={formRef}
        id="user-form"
        className="profile-container"
        onSubmit={(e) => updateUser(e)}
      >
        <ProfilePicture
          defaultValue={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          name="profile-picture"
          isEditing={isEditing}
        />
        <Bio isEditing={isEditing} />
      </form>

      {isEditing ? (
        <button type="submit" form="user-form" className="edit-profile-button">
          Save Changes
        </button>
      ) : (
        <button
          className="edit-profile-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit My Profile
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
