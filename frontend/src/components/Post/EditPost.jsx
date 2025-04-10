import { useState } from "react";
import { updatePost } from "../../services/posts"; // Import updatePost service
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

    try {
      await updatePost(token, post._id, editedContent.question, editedContent.answer);
      onSave(navigate("/posts")); // Notify parent to exit edit mod
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={editedContent.question}
        onChange={(e) => setEditedContent({ ...editedContent, question: e.target.value })}
        placeholder="Edit question"
      />
      <textarea
        value={editedContent.answer}
        onChange={(e) => setEditedContent({ ...editedContent, answer: e.target.value })}
        placeholder="Edit answer"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditPost;
