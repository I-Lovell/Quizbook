import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "./PostPreview.css";

const PostPreview = (props) => {
  const [likes] = useState(props.post.numOfLikes); // Local state for likes
  const navigate = useNavigate();

  // Function that handles redirecting to the post page
  const redirectToPost = () => {
    navigate(`/posts/${props.post._id}`);
  };

  return (
    <article className="post-preview-box" onClick={redirectToPost}>
      <div className="post-user-id"><strong>Created by:</strong> {props.post.username}</div>
      <div className="post-content">
        <p className="post-question"><strong>Question:</strong> {props.post.question}</p>
        <p className="like-count"><strong>Likes:</strong> {likes}</p>
      </div>
    </article>
  );
};

export default PostPreview;