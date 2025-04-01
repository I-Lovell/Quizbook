import { Link } from "react-router-dom";
import "./HomePage.css";
import logo from "/Quizler-Logo.png";

export const HomePage = () => {
  return (
    <div className="home">
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
      <main className="main-content">
        <div className="welcome-box">
          <p>Welcome to QuizBook! The number one hub to connect with fellow quiz-lovers!</p>
        </div>
      </main>
    </div>
  );
};