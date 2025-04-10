import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../../services/posts"; // Import updatePost service
import "./EditPost.css"; // Import CSS for modal styling

const EditPost = ({ post, onSave, onCancel }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [editedContent, setEditedContent] = useState({
    question: post.question,
    answer: post.answer,
  });

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in to edit a post.");
      return;
    }

    if (!editedContent.question || !editedContent.answer) {
      setErrorMessage("Both question and answer fields must be filled.");
      return; // Prevent saving if fields are empty
    }

    try {
      await updatePost(
        token,
        post._id,
        editedContent.question,
        editedContent.answer
      );
      onSave(); // Notify parent to exit edit mode
      setErrorMessage(""); // Clear error message on success
    } catch (err) {
      console.error("Error updating post:", err);
      setErrorMessage("Failed to update post. Please try again.");
    }
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Post</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* Display error message */}
        <input
          type="text"
          value={editedContent.question}
          onChange={(e) =>
            setEditedContent({ ...editedContent, question: e.target.value })
          }
          placeholder="Edit question"
        />
        <input
          type="text"
          value={editedContent.answer}
          onChange={(e) =>
            setEditedContent({ ...editedContent, answer: e.target.value })
          }
          placeholder="Edit answer"
        />
        <div className="modal-buttons">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
