import { useState } from "react";
import { createLike } from "../../services/likes"; // Import the like service
import "./Post.css";

const Post = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [likes, setLikes] = useState(props.post.numOfLikes); // Local state for likes

  const toggleAnswerVisibility = () => {
    setShowAnswer((prev) => !prev);
  };

  const likePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to like a post.");

    try {
      await createLike(token, props.post._id); // Call the backend to register the like
      setLikes((prevLikes) => prevLikes + 1); // Update the frontend dynamically
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <article className="post-box">
      <div className="post-user-id">Created by: {props.post.username}</div>
      <div className="post-content">
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
        <p className="like-count">Likes: {likes}</p>
        <button className="like-button" onClick={likePost}>
          Like
        </button>
      </div>
    </article>
  );
};

export default Post;
