import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { createLike } from "../../services/likes";
import { createComment, getComments } from "../../services/comments";
import { deletePost } from "../../services/posts"; // Import deletePost service
import { getSelf } from "../../services/profile"; // Import getSelf service
import Comment from "./Comments";
import EditPost from "./EditPost"; // Import the new EditPost component
import { FaTrash, FaEdit } from "react-icons/fa"; // Import icons from react-icons
import "./Post.css";
import "./Comments.css";

const Post = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [likes, setLikes] = useState(props.post.numOfLikes);
  const [isLiked, setIsLiked] = useState(props.post.liked);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(props.post.comments || []);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [currentUserID, setCurrentUserID] = useState(null); // Track current user ID
  const { token } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const result = await getComments(token, props.post._id);
        setComments(result.comments);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [props.post._id]);

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

  const toggleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to like/unlike a post.");

    try {
      const response = await createLike(token, props.post._id);
      if (response.message === "Like created") {
        setLikes((prevLikes) => prevLikes + 1);
        setIsLiked(true);
      } else if (response.message === "Like removed") {
        setLikes((prevLikes) => prevLikes - 1);
        setIsLiked(false);
      } else {
        console.error("Unexpected response from backend:", response.message);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const submitComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to comment.");
    if (!comment.trim()) return;

    try {
      await createComment(token, props.post._id, comment);
      const result = await getComments(token, props.post._id);
      setComments(result.comments);
      setComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to delete a post.");

    try {
      await deletePost(token, props.post._id); // Use props.post._id for deletion
      alert("Post deleted successfully!");
      if (props.onDelete) props.onDelete(props.post._id); // Notify parent component if needed
      navigate("/posts"); // Redirect to posts page after deletion
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post.");
    }
  };

  const toggleAnswerVisibility = () => {
    setShowAnswer((prev) => !prev);
  };

  const isPostOwner = currentUserID === props.post.user_id; // Check if the current user owns the post

  return (
    <article className="post-box">
      <div className="post-user-id">
        <span>Created by: </span>
        <span
          className="post-username"
          onClick={() => navigate(`/profile/${props.post.user_id}`)}
          style={{
            cursor: "pointer",
          }}
        >
          {props.post.username}
        </span>
      </div>
      <div className="post-content">
        {isEditing ? (
          <EditPost
            post={props.post}
            onSave={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <p className="post-question">
              <strong>Question:</strong> {props.post.question}
            </p>
            {showAnswer ? (
              <p className="post-answer">
                <strong>Answer:</strong> {props.post.answer}
              </p>
            ) : (
              <button
                className="reveal-answer-button"
                onClick={toggleAnswerVisibility}
              >
                Show Answer
              </button>
            )}
            <p className="like-count">
              <strong>Likes:</strong> {likes}
            </p>
            <button
              className={`like-button ${isLiked ? "unlike" : ""}`}
              onClick={toggleLike}
            >
              {isLiked ? "Unlike" : "Like"}
            </button>
            <div>
              <strong>Comments:</strong>
              <div className="comment-input">
                <input
                  className="comment-textarea"
                  type="text"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Write a comment..."
                />
                <button className="like-button" onClick={submitComment}>
                  Post Comment
                </button>
              </div>
            </div>
            <div>
              {comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))}
            </div>
            {isPostOwner && ( // Only show edit and delete buttons if the current user owns the post
              <div className="post-actions">
                <FaEdit
                  className="edit-icon"
                  onClick={() => setIsEditing(true)}
                  title="Edit Post"
                />
                <FaTrash
                  className="delete-icon"
                  onClick={handleDelete}
                  title="Delete Post"
                />
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default Post;
