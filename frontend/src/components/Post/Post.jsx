const Post = (props) => {
  return <article key={props.post._id}>{props.post.Question}, {props.post.Answer}, by userID {props.post.UserID}</article>;
};

export default Post;
