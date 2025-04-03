import { useState } from "react";
import { updateProfile } from "../../services/profile";
import "./ProfilePicture.css";

const ProfilePicture = ({ isEditing, token }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!profilePicture) return;

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    try {
      await updateProfile(formData, token);
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture. Please try again.");
    }
  };

  return (
    <div className="profile-picture-container">
      <img
        src={preview || "https://img.freepik.com/free-psd/cartoon-question-mark-isolated_23-2151568563.jpg?semt=ais_hybrid"}
        alt="Profile"
        className="profile-picture"
      />
      {isEditing && (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={!profilePicture}>
            Upload Picture
          </button>
        </>
      )}
    </div>
  );
};

export default ProfilePicture;

