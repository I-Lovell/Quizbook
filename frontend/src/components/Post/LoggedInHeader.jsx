
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "/Quizler-Logo.png";

export const LoggedInHeader = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Quizler Logo" className="logo" />
        <h1 className="title">QuizBook</h1>
      </div>
      <nav className="nav">
        <Link to="/posts" className="nav-button">Home</Link>
        <Link to="/profile" className="nav-button">Profile</Link>
        <button onClick={onLogout} className="nav-button">Logout</button>
      </nav>
    </header>
  );
}

export default LoggedInHeader;