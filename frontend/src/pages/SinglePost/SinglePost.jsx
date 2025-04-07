import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import { getSinglePostByID } from "../../services/posts";
import Post from "../../components/Post/Post";
import { useParams } from "react-router";
import "./SinglePost.css";

export const SinglePost = () => {
    const [post, setPosts] = useState([]);
    const navigate = useNavigate();
    let post_id = useParams();
    console.log(post);
    console.log(post_id);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");
    
        getSinglePostByID(token, post_id)
          .then((data) => {
            setPosts(data.posts);
            localStorage.setItem("token", data.token);
          })
          .catch((err) => {
            console.error(err);
            navigate("/login");
          });
      }, [navigate, post_id]);
    
      const logOutHandler = () => {
        localStorage.removeItem("token");
        navigate("/");
      };
    
    return (
      <div className="home">
        <LoggedInHeader onLogout={logOutHandler} />
        <h2>Post</h2>
        <div className="feed" role="feed">
        {post.map((post) => (
          <Post post={post} key={post._id} />
        ))};
        </div>
      </div>
    )
};

