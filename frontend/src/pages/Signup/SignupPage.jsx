import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import logo from "/Quizler-Logo.png";
import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="home">
          <header className="header">
            <div className="logo-container">
              <img src={logo} alt="Quizler Logo" className="logo" />
              <h1 className="title">QuizBook</h1>
            </div>
            </header>
      <main className="main-content">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <p className="signup-text"> Already have an account? <a className="loginButton" href="/login">Login here</a></p>
      </main>
    </div>
  );
};
