import { Link } from "react-router-dom";
import "./Header.css";
import logo from "/Quizler-Logo.png";
import Fader from "./Fader";

export const LoggedInHeader = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="fader-container">
        <Fader className="fader-1" delay={Math.random() * 4000} />
        <Fader className="fader-2" delay={Math.random() * 4000} />
        <Fader className="fader-3" delay={Math.random() * 4000} />
        <Fader className="fader-4" delay={Math.random() * 4000} />
        <Fader className="fader-5" delay={Math.random() * 4000} />
        <Fader className="fader-6" delay={Math.random() * 4000} />
        <Fader className="fader-7" delay={Math.random() * 4000} />
        <Fader className="fader-8" delay={Math.random() * 4000} />
        <Fader className="fader-9" delay={Math.random() * 4000} />
      </div>
      <div className="logo-container">
        <Link to="/posts"><img src={logo} alt="Quizler Logo" className="logo" /> </Link>
        <Link to="/posts"><h1 className="title">QuizBook</h1> </Link>
      </div>
      <nav className="nav">
        <Link to="/posts" className="nav-button">Home</Link>
        <Link to="/profile/me" className="nav-button">Profile</Link>
        <button onClick={onLogout} className="nav-button">Logout</button>

      </nav>
    </header>
  );
};

export default LoggedInHeader;
