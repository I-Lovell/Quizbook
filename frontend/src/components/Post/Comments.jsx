import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { deleteComment } from "../../services/comments";
import { useState, useEffect } from "react";
import { getSelf } from "../../services/profile";
import { FaTrash } from "react-icons/fa";
import "./Comments.css";
import "./Post.css";

const Comment = ({ comment }) => {
  const [currentUserID, setCurrentUserID] = useState(null); // Track current user ID
  const { token } = useCurrentUser();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    if (comment.userID) {
      navigate(`/profile/${comment.userID}`);
    } else {
      console.error("No user_id found in comment:", comment);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) return;

      try {
        const data = await getSelf(token);
        const currentUserData = data.user;
        setCurrentUserID(currentUserData.ID); // Set current user ID
      } catch (err) {
        console.error("Error fetching current user:", err);
        navigate("/login");
      }
    };
    fetchCurrentUser();
  }, [token, navigate]);

  const isCommentOwner = currentUserID === comment.userID;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to delete a comment.");

    try {
      await deleteComment(token, comment._id);
      alert("Comment deleted successfully!");
      if (comment.onDelete) props.onDelete(comment._id); // Notify parent component if needed
      location.reload();
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Failed to delete comment.");
    }
  };

  return (
    <div className="comment-box">
      <p className="comment-metadata">
        <span
          className="comment-username"
          onClick={navigateToProfile}
          style={{ cursor: "pointer" }}
        >
          <strong>{comment.username}</strong>
        </span>{" "}
        says:
      </p>
      <p className="comment-content">{comment.content}</p>
      <div className="post-actions">
        {isCommentOwner && (
          <FaTrash
            className="delete-icon"
            onClick={handleDelete}
            title="Delete Comment"
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
