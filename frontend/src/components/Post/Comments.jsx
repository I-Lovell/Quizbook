import { useNavigate } from "react-router-dom";
import "./Comments.css";

const Comment = ({ comment }) => {
  const navigate = useNavigate();
  
  const navigateToProfile = () => {
    if (comment.userID) {
      navigate(`/profile/${comment.userID}`);
    } else {
      console.error("No user_id found in comment:", comment);
    }
  };

  return (
    <div className="comment-box">
      <p className="comment-metadata">
        <span 
          className="comment-username"
          onClick={navigateToProfile}
          style={{ cursor: 'pointer' }}
        >
          <strong>{comment.username}</strong>
        </span>
        <span> says:</span>
      </p>
      <p className="comment-content">{comment.content}</p>
    </div>
  );
};

export default Comment;
