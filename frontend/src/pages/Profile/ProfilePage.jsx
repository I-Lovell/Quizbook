
import { useState } from "react";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import ProfilePicture from "../../components/Post/ProfilePicture";
import Bio from "../../components/Post/Bio";
import "./ProfilePage.css";
import "../Background.css";

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="home">
      <div className="backim"></div>
      <LoggedInHeader />
      <div className="profile-container">
        <ProfilePicture isEditing={isEditing} />
        <Bio isEditing={isEditing} />
      </div>
      <button className="edit-profile-button" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Save Changes" : "Edit My Profile"}
      </button>
    </div>
  );
};

export default ProfilePage;
