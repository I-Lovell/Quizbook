import { useState } from "react";
import { createLike } from "../../services/likes"; // Import the like service
import "./Post.css";

const Post = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [likes, setLikes] = useState(props.post.numOfLikes); // Initialize likes from props
  const [isLiked, setIsLiked] = useState(props.post.liked); // Initialize isLiked from the new backend field

  const toggleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to like/unlike a post.");

    try {
      const response = await createLike(token, props.post._id); // Call the backend to toggle the like
      if (response.message === "Like created") {
        setLikes((prevLikes) => prevLikes + 1); // Increment likes
        setIsLiked(true); // Mark as liked
      } else if (response.message === "Like removed") {
        setLikes((prevLikes) => prevLikes - 1); // Decrement likes
        setIsLiked(false); // Mark as unliked
      } else {
        console.error("Unexpected response from backend:", response.message);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const toggleAnswerVisibility = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <article className="post-box">
      <div className="post-user-id">Created by: {props.post.username}</div>
      <div className="post-content">
        <p className="post-question"><strong>Question:</strong> {props.post.question}</p>
        {showAnswer ? (
          <p className="post-answer"><strong>Answer:</strong> {props.post.answer}</p>
        ) : (
          <button className="reveal-answer-button" onClick={toggleAnswerVisibility}>
            Show Answer
          </button>
        )}
        <p className="like-count">Likes: {likes}</p>
        <button className={`like-button ${isLiked ? "unlike" : ""}`} onClick={toggleLike}>
          {isLiked ? "Unlike" : "Like"}
        </button>
      </div>
    </article>
  );
};

export default Post;
