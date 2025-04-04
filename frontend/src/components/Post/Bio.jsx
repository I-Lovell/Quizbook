import { useState } from "react";
import "./Bio.css";

export const Bio = ({ isEditing }) => {
  const [bio, setBio] = useState("This is a sample bio. You can add your own bio.");

  return (
    <header className="bio-container">
      {isEditing ? (
        <textarea
          name="bio"
          className="bio-edit"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      ) : (
        <p className="bio">{bio}</p>
      )}
    </header>
  );
};

export default Bio;
