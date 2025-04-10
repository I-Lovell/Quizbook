import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import "./ProfilePicture.css";

const ProfileDetails = ({ toggleEdit }) => {
  const { currentUser } = useCurrentUser();
  return (
    <div>
      <div className="profile-picture-container">
      <div className="profilePicture">
      <img
        src={
          currentUser?.profilePicture ||
          "https://img.freepik.com/free-psd/cartoon-question-mark-isolated_23-2151568563.jpg?semt=ais_hybrid"
        }
        alt="Profile"
        className="profile-picture"
      />
      </div>
      </div>
      <h2 className="username">
        {currentUser?.username || "No username"}
      </h2>
      <p className="bio">
        {currentUser?.bio || "This is a sample bio. You can add your own bio."}
      </p>
      <button className="edit-profile-button" onClick={() => toggleEdit(true)}>
        Edit bio or profile picture
      </button>
    </div>
  );
};

export default ProfileDetails;
