
import { Link } from "react-router-dom";
import logo from "/Quizler-Logo.png";
import "./Header.css";

export const Header = () => {
  return (
        <header className="header">
          <div className="logo-container">
            <img src={logo} alt="Quizler Logo" className="logo" />
            <h1 className="title">QuizBook</h1>
          </div>
          <nav className="nav">
            <Link to="/login" className="nav-button">Sign in</Link>
            <Link to="/signup" className="nav-button">Sign up</Link>
          </nav>
        </header>
  );
}

export default Header;
