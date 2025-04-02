const Post = (props) => {
  return <article key={props.post.ID}>{props.post.Question}</article>;
};

export default Post;
