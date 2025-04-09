import "./Comments.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment-box">
      <p className="comment-username">
        <strong>{comment.username}</strong> says:
      </p>
      <p className="comment-content">{comment.content}</p>
    </div>
  );
};

export default Comment;
