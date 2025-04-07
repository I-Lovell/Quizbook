import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/posts" className="home-link">Go Back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
