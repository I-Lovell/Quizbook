import { useState } from "react";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import "./ProfilePage.css";
import "../Background.css";
import ProfileForm from "../../components/ProfileForm";
import ProfileDetails from "../../components/ProfileDetails";

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="home">
      <div className="backim"></div>
      <LoggedInHeader />
      {isEditing ? (
        <ProfileForm />
      ) : (
        <ProfileDetails toggleEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default ProfilePage;
