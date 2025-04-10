import { useState } from "react";
import { updatePost } from "../../services/posts"; // Import updatePost service
import "./EditPost.css"; // Import CSS for modal styling
import { useNavigate } from "react-router-dom";

const EditPost = ({ post, onSave, onCancel }) => {
    const navigate = useNavigate();
    const [editedContent, setEditedContent] = useState({
        question: post.question,
        answer: post.answer,
  });

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to edit a post.");

    if (!editedContent.question || !editedContent.answer) {
      console.error("Both question and answer fields must be filled.");
      return; // Prevent saving if fields are empty
    }

    try {
      await updatePost(token, post._id, editedContent.question, editedContent.answer);
      onSave(); // Notify parent to exit edit mode
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post.");
    }
    navigate("/posts");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Post</h2>
        <input
          type="text"
          value={editedContent.question}
          onChange={(e) => setEditedContent({ ...editedContent, question: e.target.value })}
          placeholder="Edit question"
        />
        <input
            type="text"
          value={editedContent.answer}
          onChange={(e) => setEditedContent({ ...editedContent, answer: e.target.value })}
          placeholder="Edit answer"
        />
        <div className="modal-buttons">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
