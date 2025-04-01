
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "/Quizler-Logo.png";

export const LoggedInHeader = () => {
  return (
        <header className="header">
          <div className="logo-container">
            <img src={logo} alt="Quizler Logo" className="logo" />
            <h1 className="title">QuizBook</h1>
          </div>
          <nav className="nav">
            <Link to="/posts" className="nav-button">Home</Link>
            <Link to="/login" className="nav-button">Logout</Link>
          </nav>
        </header>
  );
}

export default LoggedInHeader;