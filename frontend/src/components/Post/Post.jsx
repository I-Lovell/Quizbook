import { useState } from "react";
import { createLike } from "../../services/likes"; // Import the like service
import "./Post.css";
import { createComment } from "../../services/comments"; // Import the comment service
import { getComments } from "../../services/comments"; // Import the comment service
import { useEffect } from "react";
import Comment from "./Comments";
import "./Comments.css";

const Post = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [likes, setLikes] = useState(props.post.numOfLikes); // Local state for likes
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(props.post.comments || []);

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

  const submitComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to comment.");

    if (!comment.trim()) return;

    try {
      await createComment(token, props.post._id, comment);

      // Re-fetch comments to get updated ones WITH username
      const result = await getComments(token, props.post._id);
      setComments(result.comments);

      setComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
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
        <div>
          <h4>Comments</h4>
          <div>
            {comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>

          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Write a comment..."
          />
          <button onClick={submitComment}>Post Comment</button>
        </div>
      </div>
    </article>
  );
};

export default Post;
