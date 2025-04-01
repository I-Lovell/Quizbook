import { Link } from "react-router-dom";
import "./HomePage.css";
import logo from "/Quizler-Logo.png";

export const HomePage = () => {
  return (
    <div className="home">
      <header className="header">
        <img src={logo} alt="Quizler Logo" className="logo" />
        <h1 className="title">Quizler</h1>
        <Link to="/login" className="SignInButton">Sign in</Link>
        <Link to="/signup" className="SignUpButton">Sign up</Link>
      </header>

      <div className="welcome-box">
        <p>Welcome to Quizler! The number one hub to connect with fellow quiz-lovers!</p>
      </div>
    </div>
  );
};
